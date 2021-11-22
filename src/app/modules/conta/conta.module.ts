import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRoutingModule } from './conta-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [NovoComponent, ListComponent],
  imports: [
    CommonModule,
    ContaRoutingModule,    
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    NgxSpinnerModule,

  ]
})
export class ContaModule { }
