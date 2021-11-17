import { UsuarioViewModel } from 'src/app/shared/models/UsuarioViewModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  objUser: UsuarioViewModel = new UsuarioViewModel();

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authentication$: AuthenticationService
  ) {
      if (this.authentication$.usuarioAtualValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(120)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          password_confirmation: ['', Validators.required]
      });

      // tslint:disable-next-line: no-string-literal
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) { return; }

      this.loading = true;
      this.objUser = Object.assign({}, this.loginForm.value, this.objUser);


      this.authentication$.register(this.objUser)
          .pipe(first())
          .subscribe(
              data => {
                this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}
