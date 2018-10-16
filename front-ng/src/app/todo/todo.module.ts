import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AddsongComponent } from './addsong/addsong.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyComponent } from './verify/verify.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent
  ],
  exports: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
  ]
})
export class TodoModule { }
