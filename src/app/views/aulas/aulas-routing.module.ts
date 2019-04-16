import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AulasComponent } from './aulas.component';

const routes: Routes = [
  {
    path: '',
    component: AulasComponent,
    data: {
      title: 'Aulas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulasRoutingModule {}
