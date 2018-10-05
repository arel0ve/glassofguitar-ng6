import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mode: string;
  private sub: any;
  message: string;

  login: string;
  password: string;

  passwordRepeat: string;
  email: string;
  tag: string;
  name: string;
  birthday: string;
  place: string;
  country: string;
  hatColor: string;
  verify: string;

  constructor(private route: ActivatedRoute, private exitRouter: Router) { }

  ngOnInit() {
    this.message = '';
    this.sub = this.route.params.subscribe(params => {
      this.mode = params['mode'] || 'login';
    });
  }

  close() {
    this.exitRouter.navigateByUrl('/');
  }

  showReg() {
    this.exitRouter.navigateByUrl('/todo/reg');
  }

  doReg(e) {
    console.log(this.password + ': ' + this.passwordRepeat);
    if (this.password !== this.passwordRepeat) {

      this.password = '';
      this.passwordRepeat = '';
      this.message = 'Passwords are different!';
      return;
    }

    fetch('http://localhost:9000/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify({
        login: this.login,
        password: this.password,
        email: this.email,
        tag : this.tag,
        name: this.name,
        birthday: this.birthday,
        place: this.place,
        country: this.country,
        hatColor: this.hatColor
      })
    }).then(response => {
      switch (response.status) {
        case 400:
          this.message = 'Not unique!';
          break;
        case 200:
          this.message = 'Ok!';
          break;
      }
      return response.text();
    }).then(message => {
      if (this.message === 'Not unique!') {
        if (message[0] === 'L') {
          this.login = '';
        } else if (message[0] === 'E') {
          this.email = '';
        }
        this.message = message + ' Change it to another one.';
      } else if (this.message === 'Ok!') {
        this.message = `Registration has done successful. Please, input verifying code (it was sent to your email).`;
        this.exitRouter.navigateByUrl('/todo/verify');
      } else {
        this.message = message;
      }
    }).catch(() => this.message = 'Something wrong! Please press \'Create\' again...');

    e.preventDefault();
  }

  doLogin(e) {
    e.preventDefault();
  }

  doVerify(e) {
    e.preventDefault();
  }

}
