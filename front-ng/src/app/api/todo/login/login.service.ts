import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth as firebaseAuth } from 'firebase/app';
import {from as fromPromise, throwError as _throw} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private http: HttpClient,
      private afAuth: AngularFireAuth
  ) { }

  doLogin({ email, password }) {
    return this.http.post('api/login',
        {
          email,
          password
        },
        {
          withCredentials: true,
          responseType: 'text'
        });
  }

  authGoogle() {
    this.afAuth.auth.signInWithRedirect(new firebaseAuth.GoogleAuthProvider());
  }

  authFacebook() {
    this.afAuth.auth.signInWithRedirect(new firebaseAuth.FacebookAuthProvider());
  }

  authEmailAndPassword({ email, password }) {
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  regEmailAndPassword({ email, password }) {
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  doLoginWithToken({ token, email = '', phone = '', name = '', photoUrl = '' }) {
    return this.http.post('api/login',
        {
          token,
          name,
          email,
          phone,
          photoUrl
        },
        {
          withCredentials: true,
          responseType: 'text'
        });
  }
}
