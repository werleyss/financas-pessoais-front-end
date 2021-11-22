import { Uteis } from './../../../shared/models/Uteis';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Key } from 'selenium-webdriver';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';
import { CategoriaViewModel } from './../../../shared/models/CategoriaViewModel';
import { CategoriaService } from './../categoria.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pesquisa: CategoriaViewModel = new CategoriaViewModel();
  current_page: number = 1;
  per_page: number = 10;
  listaCategoria: RetornoApiViewModel<CategoriaViewModel[]> = new RetornoApiViewModel<CategoriaViewModel[]>();

  constructor(
    private categoria$: CategoriaService,
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

    this.categoria$.obterTodos(obj).subscribe(
      retorno => {
        this.listaCategoria   = retorno;
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
