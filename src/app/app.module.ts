import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { menuReducer, pageContextReducer, themeReducer } from './shared/store/app-reducers';
import { DefaultComponent } from './default/default.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({
      pageContext: pageContextReducer,
      theme: themeReducer,
      menu: menuReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
