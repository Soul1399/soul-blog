import { Component, Input, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { SelectItem } from 'src/app/shared/models/ui/select-item';

@Component({
  selector: 'app-static-grid-cell-autocomplete',
  templateUrl: './static-grid-cell-autocomplete.component.html',
  styleUrls: ['./static-grid-cell-autocomplete.component.scss']
})
export class StaticGridCellAutocompleteComponent implements OnInit {
  @Input()
  options$: Observable<SelectItem[]> | null = null;
  @Input()
  filteredOptions$: Observable<SelectItem[]> | null = null;
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

  constructor() { }

  ngOnInit(): void {
  }

  onInput(text: string) {

  }

  onOptionSelected(item: MatOptionSelectionChange<SelectItem>) {

  }
}
