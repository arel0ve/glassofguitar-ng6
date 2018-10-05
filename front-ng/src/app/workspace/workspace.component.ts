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
  private sub: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      isLogin: false,
      hatColor: '#123456',

    };
    this.song = {};
    this.sub = this.route.params.subscribe(params => {
      this.login = params['login'] || '0';
      this.songId = params['songId'] || '0';
    });

    this.http.get(`http://localhost:9000/api/user/${this.login}/${this.songId}`).subscribe(user => {
      this.user = user;
      // @ts-ignore
      this.song = Object.assign({name: this.user.name, tag: this.user.tag}, user.currentSong);
    });
  }

}
