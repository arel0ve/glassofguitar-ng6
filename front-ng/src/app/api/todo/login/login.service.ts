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

  authWithRedirectGoogle() {
    return this.authWithRedirect(new firebaseAuth.GoogleAuthProvider());
  }

  authWithRedirectFacebook() {
    return this.authWithRedirect(new firebaseAuth.FacebookAuthProvider());
  }

  authWithPopupGoogle() {
    return this.authWithPopup(new firebaseAuth.GoogleAuthProvider());
  }

  authWithPopupFacebook() {
    return this.authWithPopup(new firebaseAuth.FacebookAuthProvider());
  }

  private authWithRedirect(provider) {
    let name = '';
    let email = '';
    let photoUrl = '';
    let phone = '';
    return fromPromise(this.afAuth.auth.signInWithRedirect(provider))
        .pipe(
            switchMap(() => fromPromise(this.afAuth.auth.getRedirectResult())),
            map(res => {
              name = res.user.providerData[0]['displayName'];
              email = res.user.providerData[0]['email'];
              photoUrl = res.user.providerData[0]['photoURL'];
              phone = res.user.providerData[0]['phone'];
              return res.user;
            }),
            switchMap(user => fromPromise(user.getIdToken())),
            switchMap(token => this.doLoginWithToken({
              token, email, name, phone, photoUrl
            })),
            catchError(err => {
              console.log('signInWithRedirect', err);
              return _throw(err);
            })
        );
  }

  private authWithPopup(provider) {
    let name = '';
    let email = '';
    let photoUrl = '';
    let phone = '';
    return fromPromise(this.afAuth.auth.signInWithPopup(provider))
        .pipe(
            map(res => {
              name = res.user.providerData[0]['displayName'];
              email = res.user.providerData[0]['email'];
              photoUrl = res.user.providerData[0]['photoURL'];
              phone = res.user.providerData[0]['phone'];
              return res.user;
            }),
            switchMap(user => fromPromise(user.getIdToken())),
            switchMap(token => this.doLoginWithToken({
              token, email, name, phone, photoUrl
            })),
            catchError(err => {
              console.log('signInWithPopup', err);
              return _throw(err);
            })
        );
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
