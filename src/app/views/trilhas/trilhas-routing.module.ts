import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { TrilhasComponent } from './trilhas.component';

const routes: Routes = [
  {
    path: '',
    component: TrilhasComponent,
    data: {
      title: 'Trilhas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrilhasRoutingModule {}
