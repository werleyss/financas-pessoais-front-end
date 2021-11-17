import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authentication$: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const usuarioAtual = this.authentication$.usuarioAtualValue;
      if (usuarioAtual && usuarioAtual.access_token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${usuarioAtual.access_token}`
              }
          });
      }

      return next.handle(request);
  }
}
