import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioViewModel } from 'src/app/shared/models/UsuarioViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private usuarioAtualSubject: BehaviorSubject<UsuarioViewModel>;
  public usuarioAtual: Observable<UsuarioViewModel>;

  constructor(private http: HttpClient) {
      this.usuarioAtualSubject = new BehaviorSubject<UsuarioViewModel>(JSON.parse(localStorage.getItem('usuarioAtual')));
      this.usuarioAtual = this.usuarioAtualSubject.asObservable();
  }

  public get usuarioAtualValue(): UsuarioViewModel {
      return this.usuarioAtualSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.api_url}/login`, { email, password })
          .pipe(
            map(user => {
              localStorage.setItem('usuarioAtual', JSON.stringify(user));
              this.usuarioAtualSubject.next(user);
              return user;
            }));
  }

  logout() {
      localStorage.removeItem('usuarioAtual');
      this.usuarioAtualSubject.next(null);
  }

  register(obj: UsuarioViewModel): Observable<UsuarioViewModel>{
    return this.http.post<UsuarioViewModel>(`${environment.api_url}/register`, obj);
  }
}
