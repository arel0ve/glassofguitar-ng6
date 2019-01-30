import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LogoutService} from '../../api/logout/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  message: string;

  constructor(
      private exitRouter: Router,
      private logoutService: LogoutService,
  ) { }

  ngOnInit() {
    this.message = 'confirm_logout';
  }

  close() {
    this.exitRouter.navigate(['/']);
  }

  logout() {
    this.logoutService.doLogout().subscribe(res => {
      if (res['status'] !== 'ok') {
        this.message = 'error_in_logout';
      } else {
        this.logoutService.authLogoutApp();
        this.exitRouter.navigate(['/songs']);
      }
    });
  }

}
