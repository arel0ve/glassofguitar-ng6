import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-song-page',
  templateUrl: './choose-song-page.component.html',
  styleUrls: ['./choose-song-page.component.scss']
})
export class ChooseSongPageComponent implements OnInit {

  public mode = 'song';

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
    if (this.router.url.slice(0, 5).includes('user')) {
      this.mode = 'user';
    }
  }



}
