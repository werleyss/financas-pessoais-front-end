import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './shared/components/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'conta', loadChildren: () => import('./modules/conta/conta.module').then(mod => mod.ContaModule), canActivate: [AuthGuard] },
  // tslint:disable-next-line: max-line-length
  { path: 'categoria', loadChildren: () => import('./modules/categoria/categoria.module').then(mod => mod.CategoriaModule), canActivate: [AuthGuard] },
  // tslint:disable-next-line: max-line-length
  { path: 'financeiro', loadChildren: () => import('./modules/financeiro/financeiro.module').then(mod => mod.FinanceiroModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
