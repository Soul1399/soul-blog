import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { changePageContext } from 'src/app/shared/store/app-actions';
import { AppState } from 'src/app/shared/store/app-state';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss']
})
export class AppContainerComponent implements OnInit {

  constructor(private appStore: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appStore.dispatch(changePageContext(this.route.snapshot.data['context']));
  }

}
