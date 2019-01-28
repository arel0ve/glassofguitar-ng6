import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { UserApiService } from './user-api/user-api.service';
import { SongApiService } from './song-api/song-api.service';
import { SearchQueryService } from './search-query/search-query.service';
import { AvatarService } from './avatar/avatar.service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
    LogoutService,
    UserApiService,
    SongApiService,
    SearchQueryService,
    AvatarService,
  ],
  exports: [],
  declarations: []
})
export class ServiceModule { }
