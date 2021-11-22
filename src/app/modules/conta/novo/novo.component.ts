import { Uteis } from 'src/app/shared/models/Uteis';
import { ContaService } from './../conta.service';
import { ContaViewModel } from 'src/app/shared/models/ContaViewModel';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { isNumber } from 'util';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/models/generic-form-validation';
import { MensagensValidacao } from 'src/app/shared/models/mensagens-validacao';
import { fromEvent, merge, Observable } from 'rxjs';

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
  objConta: ContaViewModel = new ContaViewModel();
  validationMessages?: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private conta$: ContaService,
    private spinner: NgxSpinnerService,
    private alert: ToastrService
) {  this.messagesValidations(); }

  ngOnInit(): void {
    this.criarForm();

    this.route.params.subscribe(params => {

      // tslint:disable-next-line: radix
      const id = parseInt(params['id']);

      this.alterar = isNumber(id) && id > 0;

      if (this.alterar) {

        this.spinner.show();

        this.conta$.obterPorId(id).subscribe(
          retorno => {

            this.spinner.hide();

            this.objConta = retorno.data;

            this.criarForm();
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
      descricao: [!this.alterar ? '' : this.objConta?.descricao, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    });
  }

  limparForm() {
    this.cadastroForm.reset();
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
    this.objConta = Object.assign({}, this.objConta, this.cadastroForm.value);
  }

  adicionar() {

    this.spinner.show();

    this.atualizarDadosObjeto();

    this.conta$.adicionar(this.objConta).subscribe(
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

    this.conta$.atualizar(this.objConta.id, this.objConta).subscribe(
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
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

}
