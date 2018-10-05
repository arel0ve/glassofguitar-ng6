import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { SongComponent } from './song/song.component';
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


const appRoutes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
  },
  {
    path: ':user',
    redirectTo: ':user/0'
  },
  {
    path: ':user/:song',
    component: WorkspaceComponent
  }
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
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
