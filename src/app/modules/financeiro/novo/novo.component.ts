import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { CategoriaViewModel } from 'src/app/shared/models/CategoriaViewModel';
import { ContaViewModel } from 'src/app/shared/models/ContaViewModel';
import { FinanceiroViewModel } from 'src/app/shared/models/FinanceiroViewModel';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/models/generic-form-validation';
import { MensagensValidacao } from 'src/app/shared/models/mensagens-validacao';
import { RetornoApiViewModel } from 'src/app/shared/models/RetornoApiViewModel';
import { Uteis } from 'src/app/shared/models/Uteis';
import { isNumber } from 'util';
import { CategoriaService } from '../../categoria/categoria.service';
import { ContaService } from '../../conta/conta.service';
import { FinanceiroService } from '../financeiro.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css']
})
export class NovoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  cadastroForm: FormGroup;
  alterar: boolean;
  loading: boolean;
  tipo: 'R' | 'P';
  objResetForm: any = {};
  objFinanceiro: FinanceiroViewModel = new FinanceiroViewModel();
  listaConta: RetornoApiViewModel<ContaViewModel[]> = new RetornoApiViewModel<ContaViewModel[]>();
  listaCategoria: RetornoApiViewModel<CategoriaViewModel[]> = new RetornoApiViewModel<CategoriaViewModel[]>();
  validationMessages?: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private financeiro$: FinanceiroService,
    private conta$: ContaService,
    private categoria$: CategoriaService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService
) {  this.messagesValidations(); }

  ngOnInit(): void {

    this.tipo = this.route.snapshot.url[0].path.indexOf('receita') >= 0 ? 'R' : 'P';

    this.criarForm();

    this.objResetForm = this.cadastroForm.value;

    this.obterListConta();

    this.obterListCategoria();

    this.route.params.subscribe(params => {

      // tslint:disable-next-line: radix
      const id = parseInt(params['id']);

      this.alterar = isNumber(id) && id > 0;

      if (this.alterar) {

        this.spinner.show();

        this.financeiro$.obterPorId(id).subscribe(
          retorno => {

            this.spinner.hide();

            this.objFinanceiro = retorno.data;

            this.criarForm();

            this.atualizarValidacaoDtPagamento();
          },
          error => {
              this.spinner.hide();

              this.alert.error(Uteis.ObterErroApi(error), 'Erro');
          });
      }
    });

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {

    // tslint:disable-next-line: prefer-const
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });

    (document.querySelector('[name="descricao"]') as HTMLElement).focus();
  }

  criarForm() {
    this.cadastroForm = this.fb.group({
      // tslint:disable-next-line: max-line-length
      descricao:     [!this.alterar ? '' : this.objFinanceiro?.descricao,     [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
      valor:         [!this.alterar ? 0  : this.objFinanceiro?.valor,         [Validators.required, Validators.min(0.1)]],
      dt_vencimento: [!this.alterar ? Uteis.obterDataAtual() : this.objFinanceiro?.dt_vencimento, [Validators.required]],
      dt_pagamento:  [!this.alterar ? '' : this.objFinanceiro?.dt_pagamento],
      status:        [!this.alterar ? 'N' : this.objFinanceiro?.status, [Validators.required]],
      categoria_id:  [!this.alterar ? 0  : this.objFinanceiro?.categoria_id,  [Validators.required, Validators.min(1)]],
      conta_id:      [!this.alterar ? 0  : this.objFinanceiro?.conta_id,      [Validators.required, Validators.min(1)]],
    });
  }

  limparForm() {
    this.cadastroForm.reset(this.objResetForm);
  }

  onSubmit() {

    this.cadastroForm?.markAllAsTouched();

    if (!this.cadastroForm?.valid) {

        this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);

        const mensagem = Uteis.ConverterObjetoToArray(this.displayMessage);

        return this.alert.warning(mensagem.toString().replace(/,/g, ''), 'Atenção');
    }

    if (!this.cadastroForm.dirty) {

        this.alert.info('Nenhuma informação foi alterada!', 'Atenção');

        return;
    }

    this.loading = true;

    if (this.alterar) {
      this.atualizar();
    } else {
      this.adicionar();
    }

  }

  atualizarDadosObjeto() {
    this.objFinanceiro = Object.assign({}, this.objFinanceiro, this.cadastroForm.value);
    this.objFinanceiro.tipo = this.tipo;
  }

  adicionar() {

    this.spinner.show();

    this.atualizarDadosObjeto();

    this.financeiro$.adicionar(this.objFinanceiro).subscribe(
      retorno => {
        this.limparForm();
        this.loading = false;
        this.spinner.hide();
        this.alert.success('Registro salvo com sucesso!', 'Sucesso');
      },
      error => {
        this.loading = false;
        this.spinner.hide();
        this.alert.error(Uteis.ObterErroApi(error), 'Erro');
      }
    );

  }

  atualizar() {

    this.spinner.show();

    this.atualizarDadosObjeto();

    this.financeiro$.atualizar(this.objFinanceiro.id, this.objFinanceiro).subscribe(
      retorno => {
        this.loading = false;
        this.spinner.hide();
        this.alert.success('Registro salvo com sucesso!', 'Sucesso');
      },
      error => {
        this.loading = false;
        this.spinner.hide();
        this.alert.error(Uteis.ObterErroApi(error), 'Erro');
      }
    );
  }

  messagesValidations() {
    this.validationMessages = {
      descricao: {
        required: MensagensValidacao.Obrigatorio('Descrição'),
        minlength: MensagensValidacao.MinimoCaracteres('Descrição', 2),
        maxlength: MensagensValidacao.MaximoCaracteres('Descrição', 120),
      },
      valor: {
        required: MensagensValidacao.Obrigatorio('Valor'),
        min: MensagensValidacao.ValorMinimo('Valor', 0.1),
      },
      dt_vencimento: {
        required: MensagensValidacao.Obrigatorio('Vencimento'),
      },
      dt_pagamento: {
        required: this.tipo === 'R' ? MensagensValidacao.Obrigatorio('Recebimento') : MensagensValidacao.Obrigatorio('Pagamento'),
      },
      categoria_id: {
        required: MensagensValidacao.Obrigatorio('Categoria'),
        min: MensagensValidacao.Obrigatorio('Categoria'),
      },
      conta_id: {
        required: MensagensValidacao.Obrigatorio('Conta'),
        min: MensagensValidacao.Obrigatorio('Conta'),
      }

    };

    this.genericValidator = new GenericValidator(this.validationMessages);
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

  atualizarValidacaoDtPagamento() {
    if (this.status.value === 'S') {
      this.dt_pagamento?.setValidators([Validators.required]);
      this.dt_pagamento?.updateValueAndValidity();
    } else {
      this.dt_pagamento?.setValidators([]);
      this.dt_pagamento?.updateValueAndValidity();
    }

  }

  get status() {
    return this.cadastroForm.get('status');
  }

  get dt_pagamento() {
    return this.cadastroForm.get('dt_pagamento');
  }

}
