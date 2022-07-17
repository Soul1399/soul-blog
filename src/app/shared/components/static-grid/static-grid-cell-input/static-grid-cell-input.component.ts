import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { StaticGridEditContext } from 'src/app/shared/models/ui/static-grid-edit-context';

@Component({
  selector: 'app-static-grid-cell-input',
  templateUrl: './static-grid-cell-input.component.html',
  styleUrls: ['./static-grid-cell-input.component.scss'],
})
export class StaticGridCellInputComponent implements OnInit {
  @Input()
  value: string = '';
  @Input()
  allowChange: boolean = true;
  @Input()
  rawValue?: any;
  @Input()
  formatter?: ((text: string) => string) | null;
  @Input()
  parser?: ((text: string) => any) | null;
  @Input()
  htmlId: string | null = null;
  @Input()
  cssClass: string[] = [];
  @Output()
  inputValueChanging = new EventEmitter<any>();
  @Output()
  inputBlur = new EventEmitter<any>();
  @Output()
  cancelEdit = new EventEmitter();
  
  constructor() {}

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

  onInputValueChanged(text: string) {
    if (!_.isFunction(this.formatter)) {
      this.inputValueChanging.emit(text);
    }
  }

  startFocus(ev: Event) {
    if (this.inputRef?.nativeElement != null && this.rawValue != null) {
      this.inputRef.nativeElement.value = this.rawValue;
    }
  }

  onKeyup(ev: KeyboardEvent) {
    if (ev.code == 'Escape') {
      this.cancelEdit.emit();
    }
  }

  endFocus(ev: Event) {
    if (this.inputRef?.nativeElement != null && _.isFunction(this.formatter) && _.isFunction(this.parser)) {
      const inputValue = this.inputRef.nativeElement.value;
      const newValue = this.parser(inputValue);
      const newText = this.formatter(inputValue);
      this.inputRef.nativeElement.value = newText;
      if (this.rawValue != newValue) {
        this.value = newText;
        this.inputValueChanging.emit(newValue);
      }
      else {
        this.inputBlur.emit(this.rawValue);
      }
    }
    else {
      this.inputBlur.emit(this.rawValue);
    }
  }
}
