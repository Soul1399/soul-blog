import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSideMenu } from '../../store/app-actions';
import { selectThemeColorsStyles } from '../../store/app-selectors';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'banner-side-nav',
  templateUrl: './banner-side-nav.component.html',
  styleUrls: ['./banner-side-nav.component.scss']
})
export class BannerSideNavComponent implements OnInit {
  
  constructor(private readonly appStore: Store<AppState>) { }

  ngOnInit(): void {
  }

  closeClick() {
    this.appStore.dispatch(toggleSideMenu({ mode: 'hidden' }));
  }
}
