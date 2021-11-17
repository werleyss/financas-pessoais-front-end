import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [NovoComponent, ListComponent],
  imports: [
    CommonModule,
    FinanceiroRoutingModule
  ]
})
export class FinanceiroModule { }
