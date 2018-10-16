import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { SongComponent } from './user/song/song.component';
import { GuitarComponent } from './guitar/guitar.component';
import { CapoKeyboardDirective } from './guitar/capo.keyboard.directive';
import { ChordKeyboardDirective } from './guitar/chord.keyboard.directive';
import { StringsKeyboardDirective } from './guitar/strings.keyboard.directive';
import { PreventDefaultKeyboardDirective } from './guitar/preventDefault.keyboard.directive';
import { GuitarMouseDirective } from './guitar/guitar.mouse.directive';
import { PreventDefaultMouseDirective } from './guitar/preventDefault.mouse.directive';
import { NotesComponent } from './notes/notes.component';
import { ChangedNotesDirective } from './notes/changed.notes.directive';
import { HoversvgDirective } from './notes/hoversvg.directive';
import { WorkspaceComponent } from './workspace/workspace.component';
import { TodoModule } from './todo/todo.module';
import { TodoComponent } from './todo/todo.component';
import {AddsongComponent} from './todo/addsong/addsong.component';
import {LoginComponent} from './todo/login/login.component';
import {LogoutComponent} from './todo/logout/logout.component';
import {RegistrationComponent} from './todo/registration/registration.component';
import {VerifyComponent} from './todo/verify/verify.component';
import {InfoComponent} from './todo/info/info.component';
import {TodoDirective} from './todo/todo.directive';

const appRoutes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
  },
  {
    path: 'user/:user',
    redirectTo: 'user/:user/0',
    pathMatch: 'full'
  },
  {
    path: 'user/:user/:song',
    component: WorkspaceComponent
  },
  {
    path: 'todo/:mode',
    component: TodoComponent,
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UserComponent,
    SongComponent,
    GuitarComponent,
    CapoKeyboardDirective,
    ChordKeyboardDirective,
    StringsKeyboardDirective,
    PreventDefaultKeyboardDirective,
    GuitarMouseDirective,
    PreventDefaultMouseDirective,
    NotesComponent,
    ChangedNotesDirective,
    HoversvgDirective,
    WorkspaceComponent,
    TodoComponent,
    TodoDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TodoModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
  ],
  entryComponents: [
    AddsongComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    VerifyComponent,
    InfoComponent,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
