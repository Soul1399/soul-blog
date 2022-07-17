import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { AppContainerComponent } from './app-container/app-container.component';
import { SharedModule } from "../shared/shared.module";
import {HomeComponent} from "./home/home.component";


@NgModule({
  declarations: [
    AppContainerComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContainerRoutingModule
  ]
})
export class ContainerModule { }
