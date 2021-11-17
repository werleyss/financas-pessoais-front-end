import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRoutingModule } from './conta-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [NovoComponent, ListComponent],
  imports: [
    CommonModule,
    ContaRoutingModule
  ]
})
export class ContaModule { }
