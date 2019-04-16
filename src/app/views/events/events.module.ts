import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EventsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    NgxMaterialTimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalDialogModule.forRoot()

  ],
  declarations: [ EventsComponent ]
})
export class EventsModule { }
