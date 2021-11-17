import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { NovoComponent } from './novo/novo.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [NovoComponent, ListComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
  ]
})
export class CategoriaModule { }
