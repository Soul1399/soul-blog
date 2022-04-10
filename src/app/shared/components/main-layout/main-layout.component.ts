import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { toggleSideMenu } from '../../store/app-actions';
import { selectSideViewDisplayMode, selectThemeColorsStyles } from '../../store/app-selectors';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sideDisplayMode$ = this.store.select(selectSideViewDisplayMode);
  themeColorsCss$ = this.store.select(selectThemeColorsStyles);
  constructor(private readonly store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    
  }

  resetSideMode() {
    this.sideDisplayMode$.pipe(first()).subscribe(mode => {
      if (mode.opened) {
        this.store.dispatch(toggleSideMenu({ mode: 'hidden' }));
      }
    });
  }
}
