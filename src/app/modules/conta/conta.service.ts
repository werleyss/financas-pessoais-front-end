import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaViewModel } from 'src/app/shared/models/ContaViewModel';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private http: HttpClient) { }

  obterTodos(obj: any): Observable<RetornoApiViewModel<ContaViewModel[]>> {

    return this.http.get<RetornoApiViewModel<ContaViewModel[]>>(`${environment.api_url}/conta`, { params: obj } );
  }

  obterPorId(id: number): Observable<RetornoApiViewModel<ContaViewModel>> {
    return this.http.get<RetornoApiViewModel<ContaViewModel>>(`${environment.api_url}/conta/${id}`);
  }

  adicionar(obj: ContaViewModel): Observable<ContaViewModel> {
    return this.http.post<ContaViewModel>(`${environment.api_url}/conta`, obj);
  }

  atualizar(id, obj: ContaViewModel): Observable<ContaViewModel> {
    return this.http.put<ContaViewModel>(`${environment.api_url}/conta/${id}`, obj);
  }
}
