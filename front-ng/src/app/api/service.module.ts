import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddSongService} from './todo/add-song/add-song.service';
import {HttpClientModule} from '@angular/common/http';
import {SaveSongService} from './save-song/save-song.service';
import {LoginService} from './todo/login/login.service';
import {LogoutService} from './todo/logout/logout.service';
import {GetUserService} from './get-user/get-user.service';
import {SearchQueryService} from './search-query/search-query.service';
import {RegistrationService} from './todo/registration/registration.service';
import {VerifyService} from './todo/verify/verify.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AddSongService,
    SaveSongService,
    LoginService,
    LogoutService,
    RegistrationService,
    VerifyService,
    GetUserService,
    SearchQueryService,
  ],
  exports: [],
  declarations: []
})
export class ServiceModule { }
