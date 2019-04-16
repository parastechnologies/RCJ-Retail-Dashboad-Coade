import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ModalDialogModule } from 'ngx-modal-dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalDialogModule.forRoot()

  ],
  declarations: [ PostsComponent ]
})
export class PostsModule { }
