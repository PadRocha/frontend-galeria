import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpTokenInterceptor } from './interceptors/http-token/http-token.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    }
  ],
})
export class AuthModule { }
