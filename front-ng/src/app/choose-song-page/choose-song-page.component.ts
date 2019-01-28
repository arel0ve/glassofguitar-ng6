import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SongListApiService} from '../api/song-list-api/song-list-api.service';
import {Song} from '../song';
import {User} from '../user';

@Component({
  selector: 'app-choose-song-page',
  templateUrl: './choose-song-page.component.html',
  styleUrls: ['./choose-song-page.component.scss']
})
export class ChooseSongPageComponent implements OnInit {

  public mode = 'song';
  public songs: Array<Song>;
  public user: Array<User>;

  constructor(
      private router: Router,
      private activatedRouter: ActivatedRoute,
      private songListApiService: SongListApiService
  ) { }

  ngOnInit() {
    if (this.router.url.slice(0, 5).includes('user')) {
      this.mode = 'user';
    }

    this.activatedRouter.params.subscribe(params => {
      if (params['artist'] && params['title']) {
        this.songListApiService.getSongsByArtistAndTitle({
          artist: params['artist'],
          title: params['title']
        })
            .subscribe(res => this.songs = res['songs']);
      } else if (params['artist']) {
        this.songListApiService.getSongsByArtist({
          artist: params['artist']
        })
            .subscribe(res => this.songs = res['songs']);
      } else if (params['login']) {
        this.songListApiService.getSongsByAuthor({
          login: params['login']
        })
            .subscribe(res => {
              this.songs = res['songs'];
              this.user = res['user'];
            });
      } else {
        this.songListApiService.getMostPopularitySongs()
            .subscribe(res => this.songs = res['songs']);
      }
    });
  }



}
