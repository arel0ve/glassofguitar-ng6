import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from as fromPromise, throwError as _throw} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpService} from '../http/http.service';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
      private http: HttpService,
      private afAuth: AngularFireAuth,
      private auth: AuthService
  ) { }

  doLogout() {
    return fromPromise(this.afAuth.auth.signOut())
        .pipe(
            switchMap(() => this.apiLogout()),
            catchError(err => {
              console.log('SignOut', err);
              return _throw(err);
            })
        );
  }

  apiLogout() {
    return this.http.post('logout',
        null,
        {
          responseType: 'json',
          withCredentials: true
        }
    );
  }

  authLogoutApp() {
    this.auth.clearToken();
  }
}
