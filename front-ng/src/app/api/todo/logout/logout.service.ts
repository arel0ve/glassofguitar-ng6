import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {from as fromPromise, throwError as _throw} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
      private http: HttpClient,
      private afAuth: AngularFireAuth
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
    return this.http.post('api/logout',
        null,
        {
          responseType: 'text',
          withCredentials: true
        }
    );
  }

  authLogoutApp() {
    localStorage.removeItem('uToken');
  }
}
