import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
    this.message = '';
  }

  setupUsername(e) {

    e.preventDefault();
  }

}
