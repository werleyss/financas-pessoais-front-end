import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NovoComponent, ListComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    PaginationModule,
    NgxSpinnerModule,

  ]
})
export class CategoriaModule { }
