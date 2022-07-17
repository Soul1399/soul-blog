import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from "./default/default.component";
import { PageService } from './shared/services/page.service';

const routes: Routes = [
  { path: '', component: DefaultComponent },
  {
    path: 'blog',
    loadChildren: () => import('./container/container.module').then(m => m.ContainerModule),
    resolve: { context: PageService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
