import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  message: string;
  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    passwordRepeat: new FormControl(),
    email: new FormControl(),
    tag: new FormControl(),
    name: new FormControl(),
    birthday: new FormControl(),
    place: new FormControl(),
    country: new FormControl(),
    hatColor: new FormControl()
  });

  constructor(private http: HttpClient, private exitRouter: Router) { }

  ngOnInit() {
    this.message = '';
  }

  doReg(e) {
    if (this.form.value.password !== this.form.value.passwordRepeat) {
      this.message = 'Passwords are different!';
      return;
    }

    this.http.post('http://localhost:9000/api/registration',
        {
          login: this.form.value.login,
          password: this.form.value.password,
          email: this.form.value.email,
          tag : this.form.value.tag,
          name: this.form.value.name,
          birthday: this.form.value.birthday,
          place: this.form.value.place,
          country: this.form.value.country,
          hatColor: this.form.value.hatColor
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
