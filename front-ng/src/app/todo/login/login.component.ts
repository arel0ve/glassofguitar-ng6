import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from '../../api/todo/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string;

  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl()
  });

  constructor(
      private exitRouter: Router,
      private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.message = '';
  }

  goReg() {
    this.exitRouter.navigateByUrl('/todo/reg');
  }

  doLogin(e) {
    this.loginService.doLogin({
      login: this.form.value.login,
      password: this.form.value.password
    }).subscribe(message => {
          if (!message.includes('Error!') && !message.includes('Warning!')) {
            this.exitRouter.navigateByUrl(`/user/${message}/0`);
          } else {
            this.message = message;
          }
    });

    e.preventDefault();
  }

}
