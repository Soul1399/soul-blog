import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import { toggleLightTheme } from '../../store/app-actions';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input()
  isLightColorTheme: boolean = false;
  @Output()
  askForMenu = new EventEmitter();

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
  }

  toggleColors(ev: MatButtonToggleChange) {
    this.store.dispatch(toggleLightTheme({ }));
  }

  menuIconClick() {
    this.askForMenu.emit();
  }
}
