import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changePageLoading } from '../../store/app-actions';
import { selectLoadingPageFlag, selectPageLayout } from '../../store/app-selectors';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  readonly DefaultLayout = 'no-layout';
  isLoading$ = this.store.select(selectLoadingPageFlag);
  layout$ = this.store.select(selectPageLayout);

  constructor(private readonly store: Store<AppState>) {
    //this.store.dispatch(changePageLoading({ value: true }));
  }

  ngOnInit(): void {
  }

}
