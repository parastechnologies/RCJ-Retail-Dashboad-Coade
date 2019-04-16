import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { QuizComponent } from './quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    data: {
      title: 'Quiz'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule {}
