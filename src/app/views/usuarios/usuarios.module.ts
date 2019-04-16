import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../pipes/search.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsuariosRoutingModule,
    ChartsModule,
    BsDropdownModule,
    NgxPaginationModule,
    ButtonsModule.forRoot(),
    ModalDialogModule.forRoot(),
    
  ],
  declarations: [ UsuariosComponent,SearchPipe ]
})
export class UsuariosModule { }
