import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authentication$: AuthenticationService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuarioAtual = this.authentication$.usuarioAtualValue;
    if (usuarioAtual) {
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
