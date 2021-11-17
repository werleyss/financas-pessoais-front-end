import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListComponent } from './list/list.component';
import { NovoComponent } from './novo/novo.component';


const routes: Routes = [
  {path: '', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'novo', component: NovoComponent, canActivate: [AuthGuard]},
  {path: 'editar/:id', component: NovoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
