import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [NovoComponent, ListComponent],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    NgxSpinnerModule,

  ]
})
export class FinanceiroModule { }
