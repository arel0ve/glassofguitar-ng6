import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';

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

  constructor(private http: HttpClient, private exitRouter: Router, private location: Location) { }

  ngOnInit() {
    this.message = '';
  }

  close() {
    this.location.back();
  }

  doCreate() {
    this.http.post('http://localhost:9000/api/addsong',
        {
          artist: this.form.value.artist,
          title: this.form.value.song
        },
        {
          withCredentials: true,
          responseType: 'text'
        }).subscribe(message => {
          if (!message.includes('Error!') && !message.includes('Warning!')) {
            this.exitRouter.navigateByUrl(`/user/${message}`);
          } else {
            this.message = message;
          }
    });
  }

}
