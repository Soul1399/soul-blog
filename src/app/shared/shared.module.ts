import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { BannerSideNavComponent } from './components/banner-side-nav/banner-side-nav.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    AppLayoutComponent,
    BannerSideNavComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    
    // material modules,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonToggleModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    // material modules
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonToggleModule,
    // components
    MainLayoutComponent,
    //HomeComponent
  ]
})
export class SharedModule { }
