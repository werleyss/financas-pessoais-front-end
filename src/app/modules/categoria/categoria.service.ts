import { CategoriaViewModel } from './../../shared/models/CategoriaViewModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  obterTodos(obj: CategoriaViewModel): Observable<RetornoApiViewModel<CategoriaViewModel>> {

    const params = new HttpParams().set('filters', JSON.stringify(obj));

    return this.http.get<RetornoApiViewModel<CategoriaViewModel>>(`${environment.api_url}/categoria`, { params });
  }

  obterPorId(id: number): Observable<CategoriaViewModel> {
    return this.http.get<CategoriaViewModel>(`${environment.api_url}/categoria/${id}`);
  }

  adicionar(obj: CategoriaViewModel): Observable<CategoriaViewModel> {
    return this.http.post<CategoriaViewModel>(`${environment.api_url}/categoria`, obj);
  }

  atualizar(id, obj: CategoriaViewModel): Observable<CategoriaViewModel> {
    return this.http.put<CategoriaViewModel>(`${environment.api_url}/categoria/${id}`, obj);
  }
}
