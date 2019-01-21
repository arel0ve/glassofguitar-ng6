import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoDirective } from './todo.directive';
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
    TodoRoutingModule
  ],
  declarations: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
    AvatarComponent,
    TodoComponent,
    TodoDirective,
  ],
  exports: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
    AvatarComponent
  ],
  entryComponents: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
    AvatarComponent,
  ],
})
export class TodoModule { }
