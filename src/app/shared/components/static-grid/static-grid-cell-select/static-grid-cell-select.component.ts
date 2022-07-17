import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectItem } from 'src/app/shared/models/ui/select-item';

@Component({
  selector: 'app-static-grid-cell-select',
  templateUrl: './static-grid-cell-select.component.html',
  styleUrls: ['./static-grid-cell-select.component.scss']
})
export class StaticGridCellSelectComponent implements OnInit {
  @Input()
  value: string | null = null;
  @Input()
  emptyItem?: SelectItem;
  @Input()
  source$: Observable<SelectItem[]> | null = null;
  @Input()
  allowChange: boolean = true;
  @Input()
  htmlId: string | null = null;
  @Output()
  selectionChanged = new EventEmitter<SelectItem>();
  @Output()
  selectBlur = new EventEmitter<SelectItem | undefined>();
  @Output()
  cancelEdit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChanged(value: string, items: SelectItem[]) {
    this.selectionChanged.emit(items.find(i => i.code === value));
  }

  onKeyup(ev: KeyboardEvent) {
    if (ev.code == 'Escape') {
      this.cancelEdit.emit();
    }
  }

  onBlur(value: string, items: SelectItem[]) {
    this.selectBlur.emit(items?.find(i => i.code === value));
  }
}
