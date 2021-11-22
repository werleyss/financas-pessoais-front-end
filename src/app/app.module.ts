import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HomeComponent } from './shared/components/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './core/guards/auth.guard';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      extendedTimeOut: 5000,
      enableHtml: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      positionClass: 'toast-bottom-right'

  }),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AppModule { }
