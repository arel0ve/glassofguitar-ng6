import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  message: string;
  form = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
    verifyCode: new FormControl()
  });

  constructor(private http: HttpClient, private exitRouter: Router) { }

  ngOnInit() {
  }

  doVerify(e) {
    this.http.post('http://localhost:9000/api/verify',
        {
          login: this.form.value.login,
          password: this.form.value.password,
          verifyCode: this.form.value.verifyCode
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
