import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  login: Observable<string>;
  songId: Observable<string>;
  user: any;
  song: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      isLogin: 'false',
      hatColor: '#123456',
    };
    this.song = {};
    this.route.params.subscribe(value => {
      this.login = value.user || '0';
      this.songId = value.song || '0';
    });

    this.http.get(`http://localhost:9000/api/user/${this.login}/${this.songId}`, {withCredentials: true}).subscribe(user => {
      this.user = user;
      // @ts-ignore
      this.song = Object.assign({name: this.user.name, tag: this.user.tag}, user.currentSong);
    });
  }

}
