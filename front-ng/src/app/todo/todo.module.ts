import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddsongComponent } from './addsong/addsong.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyComponent } from './verify/verify.component';
import { InfoComponent } from './info/info.component';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
    AvatarComponent
  ],
  exports: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
    AvatarComponent
  ]
})
export class TodoModule { }
