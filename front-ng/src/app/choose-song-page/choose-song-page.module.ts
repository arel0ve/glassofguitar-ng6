import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ChooseSongPageComponent } from './choose-song-page.component';
import { SonglistComponent } from './songlist/songlist.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ChooseSongPageRoutingModule } from './choose-song-page-routing.module';


@NgModule({
  declarations: [
    ChooseSongPageComponent,
    SonglistComponent,
    UserinfoComponent
  ],
  imports: [
    ChooseSongPageRoutingModule,
    CommonModule,
    TranslateModule.forChild()
  ]
})
export class ChooseSongPageModule { }
