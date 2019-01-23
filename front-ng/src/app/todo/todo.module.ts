import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoDirective } from './todo.directive';
import {
  AddsongComponent,
  AvatarComponent,
  LoginComponent,
  LogoutComponent,
  InfoComponent
} from './';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    TodoRoutingModule
  ],
  declarations: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    InfoComponent,
    AvatarComponent,
    TodoComponent,
    TodoDirective,
  ],
  entryComponents: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    InfoComponent,
    AvatarComponent,
  ],
})
export class TodoModule { }
