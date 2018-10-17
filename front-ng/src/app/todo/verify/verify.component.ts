import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {VerifyService} from '../../api/todo/verify/verify.service';

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

  constructor(
      private verifyService: VerifyService,
      private exitRouter: Router
  ) { }

  ngOnInit() {
  }

  doVerify(e) {
    this.verifyService.doVerify({
      login: this.form.value.login,
      password: this.form.value.password,
      verifyCode: this.form.value.verifyCode
    }).subscribe(
        url => this.exitRouter.navigateByUrl(`/user/${url}/0`),
        err => this.message = err.error
    );

    e.preventDefault();
  }

}
