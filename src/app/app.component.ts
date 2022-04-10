import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from './shared/components/base/base-component';
import { changePageContext } from './shared/store/app-actions';
import { selectLanguage, selectCurrentPage } from './shared/store/app-selectors';
import { AppState } from './shared/store/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'soul-blog-app';

  constructor(private readonly store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    //this.pipeUntilDestory(this.store.select(selectCurrentPage)).subscribe(c => console.log(c));
    //this.store.dispatch(changePageContext({ code: '' }));
  }
}
