import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { NotificacoesComponent } from './notificacoes.component';

const routes: Routes = [
  {
    path: '',
    component: NotificacoesComponent,
    data: {
      title: 'Usuários'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacoesRoutingModule {}
