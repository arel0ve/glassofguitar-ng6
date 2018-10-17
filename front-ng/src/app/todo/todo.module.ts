import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AddsongComponent,
  AvatarComponent,
  LoginComponent,
  LogoutComponent,
  InfoComponent,
  RegistrationComponent,
  VerifyComponent
} from './';

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
