import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { UserApiService } from '../../api/user-api/user-api.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  message: string;
  loading = false;

  form = new FormGroup({
    login: new FormControl(),
    name: new FormControl()
  });

  constructor(
      private exitRouter: Router,
      private userApiService: UserApiService
  ) { }

  ngOnInit() {
    this.message = '';
  }

  setupUsername(e) {
    this.userApiService.setupUsername({
      login: this.form.value.login,
      name: this.form.value.name ? this.form.value.name : this.form.value.login
    }).subscribe(res => this.exitRouter.navigate([`/user/${res['login']}`]));

    e.preventDefault();
  }

}
