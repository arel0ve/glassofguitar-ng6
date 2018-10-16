import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  message: string;

  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
    this.message = 'Are you sure want to quit from your account?';
  }

  close() {
    this.location.back();
  }

  logout() {
    this.http.post('http://localhost:9000/api/logout',
        null,
        {
          responseType: 'text',
          withCredentials: true
        }).subscribe(res => {
          if (res !== 'Ok!') {
            this.message = 'Something wrong! Please press \'Log Out\' again...';
          } else {
            this.location.back();
          }
    });
  }

}
