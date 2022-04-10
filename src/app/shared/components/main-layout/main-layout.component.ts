import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSideViewDisplayMode } from '../../store/app-selectors';
import { AppState } from '../../store/app-state';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  sideDisplayMode$ = this.store.select(selectSideViewDisplayMode);

  constructor(private readonly store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    
  }

}
