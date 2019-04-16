import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from 'ngx-modal-dialog';

import { AulasComponent } from './aulas.component';
import { AulasRoutingModule } from './aulas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AulasRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalDialogModule.forRoot()
  ],
  declarations: [ AulasComponent ]
})
export class AulasModule { }
