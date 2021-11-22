import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContaViewModel } from 'src/app/shared/models/ContaViewModel';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';
import { Uteis } from 'src/app/shared/models/Uteis';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pesquisa: ContaViewModel = new ContaViewModel();
  // tslint:disable-next-line: variable-name
  current_page = 1;
  // tslint:disable-next-line: variable-name
  per_page = 10;
  listaConta: RetornoApiViewModel<ContaViewModel[]> = new RetornoApiViewModel<ContaViewModel[]>();

  constructor(
    private conta$: ContaService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService
  ) { }

  ngOnInit(): void {
    this.obterList();
  }

  obterList() {

    this.spinner.show();

    // tslint:disable-next-line: prefer-const
    let obj = Object.assign({ page: this.current_page,  per_page: this.per_page },  this.removerObjectNull(this.pesquisa));

    this.conta$.obterTodos(obj).subscribe(
      retorno => {
        this.listaConta       = retorno;
        this.current_page     = retorno.meta.current_page;
        this.per_page         = retorno.meta.per_page;
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

      if (obj[item] === null) {
        delete obj[item];
      }

    }

    return obj;
  }

}
