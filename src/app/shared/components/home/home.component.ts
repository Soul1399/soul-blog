import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changePageContext } from '../../store/app-actions';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appStore: Store<AppState>) { }

  ngOnInit(): void {
    this.setContext();
  }

  setContext() {
    this.appStore.dispatch(changePageContext({ code: 'Home' }));
  }

}
