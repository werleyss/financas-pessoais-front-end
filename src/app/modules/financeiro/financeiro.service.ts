import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceiroViewModel } from 'src/app/shared/models/FinanceiroViewModel';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  constructor(private http: HttpClient) { }

  obterTodos(obj: any): Observable<RetornoApiViewModel<FinanceiroViewModel[]>> {

    return this.http.get<RetornoApiViewModel<FinanceiroViewModel[]>>(`${environment.api_url}/financeiro`, { params: obj });
  }

  obterPorId(id: number): Observable<RetornoApiViewModel<FinanceiroViewModel>> {
    return this.http.get<RetornoApiViewModel<FinanceiroViewModel>>(`${environment.api_url}/financeiro/${id}`);
  }

  adicionar(obj: FinanceiroViewModel): Observable<FinanceiroViewModel> {
    return this.http.post<FinanceiroViewModel>(`${environment.api_url}/financeiro`, obj);
  }

  atualizar(id, obj: FinanceiroViewModel): Observable<FinanceiroViewModel> {
    return this.http.put<FinanceiroViewModel>(`${environment.api_url}/financeiro/${id}`, obj);
  }
}
