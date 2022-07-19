
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import * as _ from 'lodash';
import { StaticGridCellOfRow } from '../../models/ui/static-grid-cell-of-row';
import { StaticGridHeader } from '../../models/ui/static-grid-header';
import { StaticGridConfiguration } from '../../models/ui/static-grid-configuration';
import { StaticGridRowContext } from '../../models/ui/static-grid-row-context';
import { defineEmptyCell, getCellContextValues, StaticGridCellContext } from '../../models/ui/static-grid-cell-context';
import { StaticGridCellType } from '../../models/ui/static-grid-cell-type';
import { fromEvent, Observable, of, Subscription, first, map, BehaviorSubject, defaultIfEmpty } from 'rxjs';
import { StaticGridEditMode } from '../../models/ui/static-grid-edit-mode';
import { SelectItem } from '../../models/ui/select-item';
import { StaticGridTemplate } from '../../models/ui/static-grid-template';
import { OnChange } from '../../on-change';
import { StaticGridChange } from '../../models/ui/static-grid-change';

@Component({
  selector: 'app-static-grid',
  templateUrl: './static-grid.component.html',
  styleUrls: ['./static-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StaticGridComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly cellTypeEnum = StaticGridCellType;
  readonly changes: StaticGridChange[] = [];

  @Input()
  headTitle: string = '';
  @Input()
  @OnChange<StaticGridConfiguration>(function(this: StaticGridComponent, conf, change) {
    this.configHasChanged(conf);
  })
  configuration = new StaticGridConfiguration();
  @Input()
  headTemplate: StaticGridTemplate = { outlet: null, outletContext: null, type: 'header' };
  @Input()
  footerTemplate: StaticGridTemplate = { outlet: null, outletContext: null, type: 'footer' };
  @Input()
  @OnChange<StaticGridHeader[] | null>(function(this: StaticGridComponent, headers, change) {
    if (_.isArray(change.currentValue) && _.isArray(change.previousValue) &&
      change.currentValue.length == change.previousValue.length &&
      _.intersection(change.currentValue, change.previousValue).length == change.currentValue.length) {
        return;
    }
    this.headersHaveChanged(headers);
  })
  headers?: StaticGridHeader[] | null = null;
  @Input()
  cellsOfRow?: StaticGridCellOfRow[] | null = null;
  @Input()
  rowData: any[] | null = [];
  @Output()
  lostFocus = new EventEmitter<StaticGridCellContext | null>();

  lastRenderedRows: StaticGridRowContext[] | null = null;
  currentEditingCell$ = new BehaviorSubject<StaticGridCellContext | null>(null);
  currentEditingCellElement: HTMLElement | null = null;
  mouseupSubscribe: Subscription | null = null;
  currentEditingCellSubscribe: Subscription | null = null;

  constructor() {}

  @ViewChild('rowsArea') rowsAreaRef?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.mouseupSubscribe = fromEvent(document, 'mouseup').subscribe((x: Event) => {
      const ev = x as MouseEvent;
      const target = ev.target as HTMLElement;
      // if (this.currentEditingCell && this.currentEditingCell.elementId) {
      //   const cell = document.querySelector(`#${this.currentEditingCell.elementId}`);
      //   const target = ev.target as HTMLElement;
      //   if (target != cell && target.closest(`#${this.currentEditingCell.elementId}`) == null) this.stopEdit();
      // }
      if (this.rowsAreaRef && this.rowsAreaRef.nativeElement) {
        if (target != this.rowsAreaRef.nativeElement && target.closest(`.${this.rowsAreaRef.nativeElement.classList[0]}`) == null) {
          this.lostFocus.emit(this.currentEditingCell$.value);
        }
      }
    });
    this.currentEditingCellSubscribe = this.currentEditingCell$.subscribe(c => {
       if (c != null) {
        c.isEditing = true;
        setTimeout(() => {
          const e = document.querySelector(`#${c.settings.cellType}_${c.elementId}`);
          if (e instanceof HTMLElement) {
            this.currentEditingCellElement = e;
            e.focus();
          }
        })
      }
      else this.currentEditingCellElement = null;
    });
  }

  ngAfterViewInit(): void {
    this.setArea();
  }

  private setArea() {
    if (this.rowsAreaRef?.nativeElement != null) {
      this.configuration.rowsArea.domElement = this.rowsAreaRef.nativeElement;
      this.configuration.commands.setRowsArea.execute(this.configuration);
    }
  }

  buildRows(array: any) {
    if (!_.isArray(array)) return [];
    const copy = array.slice();
    const config = this.configuration;
    if (_.isFunction(config.rowSort)) {
      copy.sort(config.rowSort);
    }
    const rows = copy.map((x, i) => this.buildRow(x, i + 1));
    // apply row gap to all except last
    _.initial(rows).forEach((r) => {
      r.spaceAfter = `${config.rowGap}${config.rowHeightUnit}`;
    });
    this.lastRenderedRows = rows;
    return rows;
  }

  buildRow(x: any, position: number) {
    const config = this.configuration;
    const row: StaticGridRowContext = {
      data: x,
      position: position,
      height: _.isFunction(config.getRowHeight)
        ? config.getRowHeight(x)
        : `${config.rowHeight}${config.rowHeightUnit}`,
      isHeightRedrawn: false,
      spaceAfter: '0',
      cells: [],
    };

    if (
      _.isArray(this.lastRenderedRows) &&
      this.lastRenderedRows.some((r) => r.isHeightRedrawn)
    ) {
      row.isHeightRedrawn = true;
      if (_.isFunction(config.commands.setRowHeight.command)) {
        config.commands.setRowHeight.execute(config, row, null, x, this.rowData).pipe(first()).subscribe(h => row.height = h ?? '');
      }
    }
    row.cells = this.buildCells(row);
    return row;
  }

  buildCells(row: StaticGridRowContext) {
    if (row == null) return [];
    const config = this.configuration;
    const cells: StaticGridCellContext[] = [];
    this.buildCellsFromHeaders(row, cells);
    this.buildCellsFromCellsOfRow(row, cells);

    // apply cell gap to all except last
    _.initial(cells).forEach((c) => {
      c.spaceAfter = `${config.cellGap}px`;
    });
    // set inline styles/class
    cells.forEach((c) => {
      if (!c.enabled) c.cssClass?.push('disabled');
      c.cssStyle = Object.assign(c.cssStyle ?? {}, { width: c.width, 'margin-right': c.spaceAfter });
    });

    return cells;
  }

  buildCellsFromHeaders(
    row: StaticGridRowContext,
    cells: StaticGridCellContext[]
  ) {
    if (
      _.isArray(this.headers) &&
      !this.headers.some((h) => !h.relatedCells || !h.relatedCells.length)
    ) {
      let order: number = 0;
      for (const header of this.headers) {
        if (_.isArray(header.relatedCells) && header.relatedCells.length > 0) {
          const columnsWidth = header.width ? Math.round(header.width / header.relatedCells.length) : null;
          for (const cellOfRow of header.relatedCells) {
            const values = getCellContextValues(row, cellOfRow);
            order++;
            const cell: StaticGridCellContext = {
              row: row,
              settings: cellOfRow,
              value: values.value,
              displayedValue: values.displayedValue,
              editedValue: values.editedValue,
              width: `${cellOfRow.width || columnsWidth || this.configuration.cellWidth}px`,
              spaceAfter: '0',
              enabled:
                (header.enabled ?? true) &&
                (_.isFunction(cellOfRow.enabled)
                  ? cellOfRow.enabled(row)
                  : (cellOfRow.enabled ?? true)),
              visible:
                (header.visible ?? true) &&
                (_.isFunction(cellOfRow.visible)
                  ? cellOfRow.visible(row)
                  : (cellOfRow.visible ?? true)),
              order: order,
              elementId: `static_grid_cell_${order}_${row.position}`,
              isDirectEdit:
                (cellOfRow.cellEditMode ?? StaticGridEditMode.direct) ==
                StaticGridEditMode.direct,
              isEditing: false,
              isEditable: !!cellOfRow.cellType && cellOfRow.cellType != StaticGridCellType.label,
              cssClass: _.isFunction(cellOfRow.cssClass)
                ? cellOfRow.cssClass(row)
                : cellOfRow.cssClass?.slice() ?? [],
              cssStyle: typeof cellOfRow.placeItem === 'string' ? { display: 'grid', 'place-items': cellOfRow.placeItem } : {},
              params: _.clone(cellOfRow.params)
            };
            defineEmptyCell(cell);

            const relatedValues = _.isFunction(cellOfRow.relatedValues)
              ? cellOfRow.relatedValues(row)
              : _.isArray(cellOfRow.relatedValues)
              ? cellOfRow.relatedValues.slice()
              : [];
            cell.relatedValues =
              relatedValues instanceof Observable
                ? relatedValues
                : of(relatedValues);
            
            cells.push(cell);
          }
        }
      }
    }
  }

  buildCellsFromCellsOfRow(row: StaticGridRowContext, cells: StaticGridCellContext[]) {
    if (_.isArray(this.cellsOfRow)) {
      
    }
  }

  startEditCell(ev: MouseEvent, cell: StaticGridCellContext) {
    if (!cell.enabled) {
      ev.preventDefault();
      return;
    }
    if (
      (cell.settings.cellEditMode == StaticGridEditMode.doubleClick &&
        ev.type == 'dblclick') ||
      (cell.settings.cellEditMode == StaticGridEditMode.singleClick &&
        ev.type == 'click')
    ) {
      if (this.currentEditingCell$.getValue() == null) {
        this.currentEditingCell$.next(cell);
      }
      else {
        this.currentEditingCell$.pipe(first(c => c == null)).subscribe(() => {
          this.currentEditingCell$.next(cell);
        });
      }
    }
  }

  onCellValueChanging(row: StaticGridRowContext, cell: StaticGridCellContext, newValue: any) {
    const currentCell = this.currentEditingCell$.getValue();
    if (cell.isDirectEdit) this.validateDirectEdit(row, cell, newValue);
    else if (currentCell == cell) {
      let validated = this.stopEdit(newValue);
      if (typeof validated === 'boolean' && validated) validated = of(true);
      if (validated instanceof Observable) {
        validated.pipe(first()).subscribe(x => {
          if (x) this.currentEditingCell$.next(null);
        });
      }
    }
  }

  onCellBlur(row: StaticGridRowContext, cell: StaticGridCellContext, newValue: any) {
    this.cancelEdit(cell);
  }

  validateDirectEdit(row: StaticGridRowContext, cell: StaticGridCellContext, newValue: any) {
    if (cell.settings.cellType == StaticGridCellType.input) {
      this.setValueFromInput(row, cell, newValue).pipe(first()).subscribe(c => this.validateCell(cell));
    }
    else if (cell.settings.cellType == StaticGridCellType.select) {
      const item = newValue as SelectItem;
      this.setValueFromInput(row, cell, item.code).pipe(first()).subscribe(c => this.validateCell(cell));
    }
    else if (cell.settings.cellType == StaticGridCellType.autocomplete) {
      const item = newValue as SelectItem;
      this.setValueFromInput(row, cell, item.code).pipe(first()).subscribe(c => this.validateCell(cell));
    }
  }

  setValueFromInput(row: StaticGridRowContext, cell: StaticGridCellContext, inputValue: any) : Observable<StaticGridCellContext> {
    if (cell.settings.valueField) {
      const copy = _.clone(cell.row.data);
      copy[cell.settings.valueField] = inputValue;
      return this.configuration.commands.set.execute(this.configuration, row, cell, copy, this.rowData).pipe(first(), map(result => {
        let newCell: StaticGridCellContext = cell;
        if (result) {
          if (this.configuration.forceRedrawOnChange) {
            row.cells = row.cells.map(c => {
              const cellCopy = _.clone(c);
              if (c === cell) {
                Object.assign(cellCopy, getCellContextValues(row, cell.settings));
                defineEmptyCell(cellCopy);
                this.changes.push({ key: cell.elementId ?? `${row.position}_${cell.order}`, type: 'modify', valueBefore: cell, valueAfter: cellCopy });
                newCell = cellCopy;
              }
              return cellCopy;
            });
          }
          else {
            const change: StaticGridChange = { key: cell.elementId ?? `${row.position}_${cell.order}`, type: 'modify', valueBefore: _.cloneDeep(cell), valueAfter: {} };
            Object.assign(cell, getCellContextValues(row, cell.settings));
            defineEmptyCell(cell);
            change.valueAfter = cell;
            this.changes.push(change);
          }
        }
        return newCell;
      }));
    }
    return of(cell);
  }

  validateCell(cell: StaticGridCellContext, newValue?: any) : Observable<boolean> | boolean {
    if (!cell.isDirectEdit) {
      if (cell.settings.cellType == StaticGridCellType.input) {
        return this.setValueFromInput(cell.row, cell, newValue).pipe(first(), map(c => !(c.isEditing = false)));
      }
      else if (cell.settings.cellType == StaticGridCellType.select) {
        const item = newValue as SelectItem;
        return this.setValueFromInput(cell.row, cell, item.code).pipe(first(), map(c => !(c.isEditing = false)));
      }
    }
    cell.isEditing = false;
    return true;
  }

  cancelEdit(cell: StaticGridCellContext) {
    if (cell.isDirectEdit) return;
    cell.isEditing = false;
    this.currentEditingCell$.next(null);
  }

  stopEdit(newValue?: any) {
    const currentCell = this.currentEditingCell$.getValue();
    if (currentCell !== null) {
      const validated = this.validateCell(currentCell, newValue);
      return validated;
    }
    return true;
  }

  reloadHead() {
    if (this.headTemplate == null) return;
    this.headTemplate = _.clone(this.headTemplate);
  }

  reloadFooter() {
    if (this.footerTemplate == null) return;
    this.footerTemplate = _.clone(this.footerTemplate);
  }

  reloadRows() {
    if (!_.isArray(this.rowData)) return;
    this.rowData = this.rowData.slice();
  }

  reloadHeaders() {
    if (!_.isArray(this.headers)) return;
    else this.headers = this.headers.slice();
  }

  configHasChanged(config: StaticGridConfiguration) {
    if (config == null) throw "Configuration cannot be null";
    this.setArea();
    this.reloadHead();
    this.reloadHeaders();
    this.reloadRows();
    this.reloadFooter();
  }

  headersHaveChanged(headers: StaticGridHeader[] | null) {
    this.adjustHeadersWidths();
    this.reloadRows();
  }

  adjustHeadersWidths() {
    if (_.isArray(this.headers)) {
      this.headers.forEach(hd => {
        if (_.isArray(hd.relatedCells) && hd.relatedCells.length > 0) {
          const totalWidth = hd.relatedCells.reduce((x, y) => x + (y.width ?? 0), 0);
          if (hd.width == null || hd.width < totalWidth) {
            hd.width = totalWidth;
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.mouseupSubscribe != null) {
      this.mouseupSubscribe.unsubscribe();
      this.mouseupSubscribe = null;
    }
    if (this.currentEditingCellSubscribe != null) {
      this.currentEditingCellSubscribe.unsubscribe();
      this.currentEditingCellSubscribe = null;
    }
  }
}
