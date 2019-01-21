import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MenuComponent } from '../menu/menu.component';
import { UserComponent } from '../user/user.component';
import { SongComponent } from '../user/song/song.component';
import { GuitarComponent } from '../guitar/guitar.component';
import { CapoKeyboardDirective } from '../guitar/capo.keyboard.directive';
import { ChordKeyboardDirective } from '../guitar/chord.keyboard.directive';
import { StringsKeyboardDirective } from '../guitar/strings.keyboard.directive';
import { PreventDefaultKeyboardDirective } from '../guitar/preventDefault.keyboard.directive';
import { GuitarMouseDirective } from '../guitar/guitar.mouse.directive';
import { PreventDefaultMouseDirective } from '../guitar/preventDefault.mouse.directive';
import { NotesComponent } from '../notes/notes.component';
import { ChangedNotesDirective } from '../notes/changed.notes.directive';
import { HoversvgDirective } from '../notes/hoversvg.directive';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';

@NgModule({
  declarations: [
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
    CommonModule,
    WorkspaceRoutingModule,
    TranslateModule.forChild()
  ]
})
export class WorkspaceModule { }
