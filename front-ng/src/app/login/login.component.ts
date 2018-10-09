import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient, private exitRouter: Router) { }

  ngOnInit() {
    this.message = '';
  }

  doLogin(e) {
    this.http.post('http://localhost:9000/api/login',
        {
          login: this.form.value.login,
          password: this.form.value.password
        },
        {
          withCredentials: true,
          responseType: 'text'
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
