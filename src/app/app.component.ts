import { UsuarioViewModel } from 'src/app/shared/models/UsuarioViewModel';
import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financas-pessoais-angular';
  acessoUsuario?: UsuarioViewModel;
  constructor(private autenticacao$: AuthenticationService) {
    this.obterUsuarioAtual();
  }

  obterUsuarioAtual() {
    this.autenticacao$.usuarioAtual.subscribe(acesso => this.acessoUsuario = acesso );

  }
}
