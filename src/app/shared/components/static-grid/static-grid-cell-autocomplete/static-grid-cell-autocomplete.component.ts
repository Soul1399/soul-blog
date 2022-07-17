import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import * as _ from 'lodash';
import { Observable, of, Subject } from 'rxjs';
import {
  combineLatest,
  combineLatestWith,
  debounceTime,
  map,
  mergeWith,
  switchMap,
} from 'rxjs/operators';
import { SelectItem } from 'src/app/shared/models/ui/select-item';
import { OnChange } from 'src/app/shared/on-change';

@Component({
  selector: 'app-static-grid-cell-autocomplete',
  templateUrl: './static-grid-cell-autocomplete.component.html',
  styleUrls: ['./static-grid-cell-autocomplete.component.scss'],
})
export class StaticGridCellAutocompleteComponent implements OnInit {
  @Input()
  @OnChange<((text: string) => Observable<SelectItem[]>) | null>(function(this: StaticGridCellAutocompleteComponent, fn, change) {
    this.setupOptions();
  })
  filterFunction: ((text: string) => Observable<SelectItem[]>) | null = null;
  @Input()
  @OnChange<number>(function(this: StaticGridCellAutocompleteComponent, delay, change) {
    this.setupOptions();
  })
  filterDelay: number = 0;
  @Input()
  allowChange: boolean = true;
  @Input()
  htmlId: string | null = null;
  @Input()
  cssInputClass: string[] = [];
  @Input()
  textValue: string | null = null;
  @Input()
  rawValue: any;
  @Output()
  selectionChanged = new EventEmitter<SelectItem>();

  options$: Observable<SelectItem[]> = of([]);
  filteredOptions$: Observable<SelectItem[]> = of([]);
  readonly inputText$ = new Subject<string>();

  constructor() {}

  @Input()
  set availableOptions$(value: SelectItem[] | Observable<SelectItem[]> | null) {
    if (value instanceof Observable) this.options$ = value;
    else if (_.isArguments(value)) this.options$ = of(value);
    this.options$ = of([]);
    this.setupOptions();
  }

  ngOnInit(): void {
    this.setupOptions();
  }

  onInput(text: string) {
    this.inputText$.next(text);
  }

  onOptionSelected(item: MatOptionSelectionChange<SelectItem>) {
    this.selectionChanged.emit(item.source.value);
  }

  setupOptions() {
    this.filteredOptions$ = this.inputText$.pipe(
      debounceTime(this.filterDelay < 0 ? 0 : this.filterDelay),
      switchMap(text => {
        if (_.isFunction(this.filterFunction)) {
          return of(text).pipe(combineLatestWith(this.filterFunction(text)));
        }
        return of([text, new Array<SelectItem>()]);
      }),
      combineLatestWith(this.options$),
      map(([[t, s], options]) => {
        const results = s as SelectItem[];
        if (options.length > 0) {
          const text = ((t as string) || '').toLowerCase().trim();
          return options.filter(
           (x) => x.name.toString().toLowerCase().trim().indexOf(text) > -1
          ).concat(results);
        }
        return results;
      })
    );
  }
}
