import {Component, OnInit} from '@angular/core';

import { User } from './user';
import { Song } from './song';

import { USERS } from './users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLogin: boolean;
  user: User;
  song: Song;

  constructor() { }

  ngOnInit() {
   Window.prototype.guitar = null;
   this.user = USERS[0];
   this.song = USERS[0].songs[0];
   this.isLogin = false;
  }
}
