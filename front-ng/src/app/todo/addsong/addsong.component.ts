import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {Location} from '@angular/common';
import {AddSongService} from '../../api/todo/add-song/add-song.service';

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
      private addSongService: AddSongService,
  ) { }

  ngOnInit() {
    this.message = '';
  }

  close() {
    this.location.back();
  }

  doCreate() {
    this.addSongService.addSong({
      artist: this.form.value.artist,
      song: this.form.value.song
    }).subscribe(
        url => this.exitRouter.navigate([`/user/${url}`]),
        err => this.message = err.error
    );
  }

}
