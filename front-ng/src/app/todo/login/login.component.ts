import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from '../../api/login/login.service';
import {from as fromPromise} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';

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
      private auth: AuthService,
      private loginService: LoginService,
      private _ngZone: NgZone
  ) { }

  ngOnInit() {
    this.message = '';
  }

  doLogin(e) {
    this.loginService.doLogin({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(
        url => this.exitRouter.navigate([`/user/${url}`]),
        err => this.message = err.error
    );

    e.preventDefault();
  }

  doLoginWithGoogle() {
    this.loading = true;
    if (window['cordova']) {
      this._ngZone.runOutsideAngular(() => {
        this.loginService.authWithRedirectGoogle().subscribe(
            url => this.finishLogin(url),
            err => this.errorLogin(err));
      });
    } else {
      this._ngZone.runOutsideAngular(() => {
        this.loginService.authWithPopupGoogle().subscribe(
            url => this.finishLogin(url),
            err => this.errorLogin(err));
      });
    }
  }

  doLoginWithFacebook() {
    this.loading = true;
    if (window['cordova']) {
      this._ngZone.runOutsideAngular(() => {
        this.loginService.authWithRedirectFacebook().subscribe(
            url => this.finishLogin(url),
            err => this.errorLogin(err));
      });
    } else {
      this._ngZone.runOutsideAngular(() => {
        this.loginService.authWithPopupFacebook().subscribe(
            url => this.finishLogin(url),
            err => this.errorLogin(err));
      });
    }
  }

  finishLogin(rez) {
    this.loading = false;
    this.auth.setToken(rez.uToken);
    this._ngZone.run(() => {
      if (rez.login) {
        this.exitRouter.navigate([`/user/${rez.login}`]);
      } else {
        this.exitRouter.navigate([`/todo/username`]);
      }
    });
  }

  errorLogin(err) {
    this.loading = false;
    this.message = err.error;
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
                this.message = 'Your email still not yet registered in database. Registering...';
                this.loginService.regEmailAndPassword({
                  email: this.form.value.email,
                  password: this.form.value.password
                })
                    .subscribe(res => this.authWithLoginAndPassword(res));
              } else if (err.code === 'auth/wrong-password') {
                this.loading = false;
                this.message = 'Wrong password';
              } else {
                this.loading = false;
                this.message = 'Something wrong. Please try again later';
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
        rez => this.finishLogin(rez),
        err => this.errorLogin(err));
  }

}
