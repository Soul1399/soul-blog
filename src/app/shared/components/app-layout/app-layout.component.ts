import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { nameof } from 'ts-simple-nameof';
import { AppPageContext } from '../../models/app-page-context';
import { AppTheme } from '../../models/app-theme';
import { toggleSideMenu } from '../../store/app-actions';
import { selectAppTheme, selectCurrentPage } from '../../store/app-selectors';
import { AppState } from '../../store/app-state';
import { BaseComponent } from '../base/base-component';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent extends BaseComponent implements OnInit, OnChanges {
  
  theme$ = this.appStore.select(selectAppTheme);
  pageContext$ = this.appStore.select(selectCurrentPage);

  mainClass: string[] = [];
  
  constructor(private readonly appStore: Store<AppState>) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
    this.pipeUntilDestory(this.theme$).subscribe(thm => {
      const fontName = thm?.font ? thm.font.replace(/[^a-zA-Z\-]/g, '-').toLowerCase() : 'default';
      const colorLight = thm?.lightThemeOff ? 'dark' : 'light';
      this.mainClass = [`${fontName}-font`, 'colors', colorLight];
    });
  }

  displayMenu() {
    this.appStore.dispatch(toggleSideMenu({ mode: 'visible-side' }));
  }
}
