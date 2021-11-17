import { CategoriaViewModel } from './../../../shared/models/CategoriaViewModel';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pesquisa: CategoriaViewModel = new CategoriaViewModel();

  constructor(
    private categoria$: CategoriaService
  ) { }

  ngOnInit(): void {
    this.obterList();
  }

  obterList() {
    this.categoria$.obterTodos(this.pesquisa).subscribe(
      retorno => {
        console.log(retorno);
      },
      error => {

      }
    );
  }

}
