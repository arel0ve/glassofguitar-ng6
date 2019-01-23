import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddSongService} from './todo/add-song/add-song.service';
import {HttpClientModule} from '@angular/common/http';
import {SaveSongService} from './save-song/save-song.service';
import {LoginService} from './todo/login/login.service';
import {LogoutService} from './todo/logout/logout.service';
import {GetUserService} from './get-user/get-user.service';
import {SearchQueryService} from './search-query/search-query.service';
import {AvatarService} from './todo/avatar/avatar.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    AddSongService,
    SaveSongService,
    LoginService,
    LogoutService,
    GetUserService,
    SearchQueryService,
    AvatarService,
  ],
  exports: [],
  declarations: []
})
export class ServiceModule { }
