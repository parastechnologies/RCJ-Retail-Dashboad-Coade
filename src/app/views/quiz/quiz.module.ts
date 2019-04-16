import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { QuizComponent } from './quiz.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { ModalDialogModule } from 'ngx-modal-dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuizRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalDialogModule.forRoot()
  ],
  declarations: [QuizComponent]
})
export class QuizModule { }
