import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { BannerSideNavComponent } from './components/banner-side-nav/banner-side-nav.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { BaseComponent } from "./components/base/base-component";
import { RouterModule } from '@angular/router';
import { StaticGridComponent } from './components/static-grid/static-grid.component';
import { StaticGridRowFilterPipe } from './pipes/static-grid-row-filter.pipe';
import { StaticGridCellSelectComponent } from './components/static-grid/static-grid-cell-select/static-grid-cell-select.component';
import { StaticGridCellInputComponent } from './components/static-grid/static-grid-cell-input/static-grid-cell-input.component';
import { StaticGridCellAutocompleteComponent } from './components/static-grid/static-grid-cell-autocomplete/static-grid-cell-autocomplete.component';

@NgModule({
  declarations: [
    BaseComponent,
    MainLayoutComponent,
    AppLayoutComponent,
    BannerSideNavComponent,
    TopBarComponent,
    PageLayoutComponent,
    StaticGridComponent,
    StaticGridRowFilterPipe,
    StaticGridCellSelectComponent,
    StaticGridCellInputComponent,
    StaticGridCellAutocompleteComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    // material modules,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  exports: [
    RouterModule,
    // material modules
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,

    // components
    BaseComponent,
    MainLayoutComponent,
    AppLayoutComponent,
    BannerSideNavComponent,
    TopBarComponent,
    PageLayoutComponent,
    StaticGridComponent,
    StaticGridRowFilterPipe,
    StaticGridCellSelectComponent,
    StaticGridCellInputComponent
  ]
})
export class SharedModule { }
