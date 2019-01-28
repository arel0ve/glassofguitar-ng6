import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {Location} from '@angular/common';
import {SongApiService} from '../../api/song-api/song-api.service';

@Component({
  selector: 'app-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.scss']
})
export class AddsongComponent implements OnInit {

  message: string;

  form = new FormGroup({
    artist: new FormControl(),
    song: new FormControl()
  });

  constructor(
      private exitRouter: Router,
      private location: Location,
      private songApiService: SongApiService,
  ) { }

  ngOnInit() {
    this.message = '';
  }

  close() {
    this.location.back();
  }

  doCreate() {
    this.songApiService.addSong({
      artist: this.form.value.artist,
      song: this.form.value.song
    }).subscribe(
        res => this.exitRouter.navigate([`/user/${res['url']}`]),
        err => this.message = err.error
    );
  }

}
