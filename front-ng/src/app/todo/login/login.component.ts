import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {LoginService} from '../../api/todo/login/login.service';
import {from as fromPromise, throwError as _throw} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;
  loading = false;

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
      private exitRouter: Router,
      private loginService: LoginService,
      private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.message = '';
    let name = '';
    let email = '';
    let photoUrl = '';
    fromPromise(this.afAuth.auth.getRedirectResult())
        .subscribe(result => {
          if (result.user) {
            this.loading = true;
            name = result.user.providerData[0]['displayName'];
            email = result.user.providerData[0]['email'];
            photoUrl = result.user.providerData[0]['photoURL'];
            fromPromise(result.user.getIdToken())
                .pipe(
                    switchMap((token: string) => {
                      this.message = 'Authenticated with firebase successful';
                      return this.loginService.doLoginWithToken({ token, name, email, photoUrl });
                    }),
                    catchError(error => {
                      console.error('signInWithRedirect', error);
                      return _throw(error);
                    })
                ).subscribe(
                    url => {
                      this.loading = false;
                      this.exitRouter.navigate([`/user/${url}/0`]);
                    },
                    err => {
                      this.loading = false;
                      this.message = err.error;
                    });
          }
        });
  }

  goReg() {
    this.exitRouter.navigateByUrl('/todo/reg');
  }

  doLogin(e) {
    this.loginService.doLogin({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(
        url => this.exitRouter.navigateByUrl(`/user/${url}/0`),
        err => this.message = err.error
    );

    e.preventDefault();
  }

  doLoginWithGoogle() {
    this.loading = true;
    this.loginService.authGoogle();
  }

  doLoginWithFacebook() {
    this.loading = true;
    this.loginService.authFacebook();
  }

  doLoginWithEmailAndPassword(e) {
    this.loading = true;
    this.loginService.authEmailAndPassword({
      email: this.form.value.email,
      password: this.form.value.password
    })
        .subscribe(
            res => this.authWithLoginAndPassword(res),
            err => {
              if (err.code === 'auth/user-not-found') {
                this.loginService.regEmailAndPassword({
                  email: this.form.value.email,
                  password: this.form.value.password
                })
                    .subscribe(res => this.authWithLoginAndPassword(res));
              }
            });

    e.preventDefault();
  }

  authWithLoginAndPassword(res) {
    const email = res.user.email;
    fromPromise(res.user.getIdToken())
        .pipe(
            switchMap((token: string) => {
              this.message = 'Authenticated with firebase successful';
              return this.loginService.doLoginWithToken({ token, email });
            })
        ).subscribe(
        url => {
          this.loading = false;
          this.exitRouter.navigate([`/user/${url}/0`]);
        },
        err => {
          this.loading = false;
          this.message = err.error;
        });
  }

}
