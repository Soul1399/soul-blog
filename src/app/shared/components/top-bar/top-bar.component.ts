import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import { Languages } from '../../models/app-languages';
import { SelectItem } from '../../models/ui/select-item';
import { changeLanguage, toggleLightTheme } from '../../store/app-actions';
import { AppState, DEFAULT_LANGUAGE } from '../../store/app-state';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input()
  isLightColorTheme: boolean = false;
  @Input()
  selectedLanguage: string = DEFAULT_LANGUAGE.code;
  @Output()
  askForMenu = new EventEmitter();

  languages = Languages.map(e => Object.assign(new SelectItem(), e));

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggleColors(ev: MatButtonToggleChange) {
    this.store.dispatch(toggleLightTheme({ }));
  }

  menuIconClick() {
    this.askForMenu.emit();
  }

  languageSelected(code: string) {
    this.store.dispatch(changeLanguage({ code: code }));
  }
}
