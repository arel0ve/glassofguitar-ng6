import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {LogoutService} from '../../api/todo/logout/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  message: string;

  constructor(
      private location: Location,
      private logoutService: LogoutService,
  ) { }

  ngOnInit() {
    this.message = 'Are you sure want to quit from your account?';
  }

  close() {
    this.location.back();
  }

  logout() {
    this.logoutService.doLogout().subscribe(res => {
      if (res !== 'Ok!') {
        this.message = 'Something wrong! Please press \'Log Out\' again...';
      } else {
        this.location.back();
      }
    });
  }

}
