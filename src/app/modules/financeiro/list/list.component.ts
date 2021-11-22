import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoriaViewModel } from 'src/app/shared/models/CategoriaViewModel';
import { ContaViewModel } from 'src/app/shared/models/ContaViewModel';
import { FinanceiroViewModel } from 'src/app/shared/models/FinanceiroViewModel';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';
import { Uteis } from 'src/app/shared/models/Uteis';
import { CategoriaService } from '../../categoria/categoria.service';
import { ContaService } from '../../conta/conta.service';
import { FinanceiroService } from '../financeiro.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pesquisa: FinanceiroViewModel = new FinanceiroViewModel();
  current_page: number = 1;
  per_page: number = 10;
  tipo?: string;
  listaFinanceiro: RetornoApiViewModel<FinanceiroViewModel[]> = new RetornoApiViewModel<FinanceiroViewModel[]>();
  listaConta: RetornoApiViewModel<ContaViewModel[]> = new RetornoApiViewModel<ContaViewModel[]>();
  listaCategoria: RetornoApiViewModel<CategoriaViewModel[]> = new RetornoApiViewModel<CategoriaViewModel[]>();

  constructor(
    private financeiro$: FinanceiroService,
    private conta$: ContaService,
    private categoria$: CategoriaService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {

    this.tipo = this.route.snapshot.url[0].path.indexOf('receita') >= 0 ? 'R' : 'P';

    this.pesquisa.dt_vencimento_inicial = Uteis.obterDataInicial();

    // tslint:disable-next-line: max-line-length
    this.pesquisa.dt_vencimento_final = Uteis.obterDataFinal();

    this.obterList();

    this.obterListConta();

    this.obterListCategoria();
  }

  obterList() {

    this.spinner.show();

    // tslint:disable-next-line: prefer-const
    let obj = Object.assign({ page: this.current_page,  per_page: this.per_page, tipo: this.tipo },  this.removerObjectNull(this.pesquisa));

    this.financeiro$.obterTodos(obj).subscribe(
      retorno => {
        this.listaFinanceiro       = retorno;
        this.current_page          = retorno.meta.current_page;
        this.per_page              = retorno.meta.per_page;
        this.spinner.hide();
      },

      error => {
        this.alert.error(Uteis.ObterErroApi(error), 'Error');
        this.spinner.hide();
      }
    );
  }

  mudarPagina(event: any) {

    this.per_page = event.itemsPerPage,

    this.current_page = event.page;

    this.obterList();
  }

  removerObjectNull(obj: object) {

    for (const item in obj) {

      if (obj[item] === null || !obj[item]) {
        delete obj[item];
      }

    }

    return obj;
  }

  obterListConta() {
    this.conta$.obterTodos(new ContaViewModel()).subscribe(

      retorno => this.listaConta = retorno,

      error => this.alert.error(Uteis.ObterErroApi(error), 'Error')

    );
  }

  obterListCategoria() {
    this.categoria$.obterTodos(new CategoriaViewModel()).subscribe(

      retorno => this.listaCategoria = retorno,

      error => this.alert.error(Uteis.ObterErroApi(error), 'Error')

    );
  }

}
