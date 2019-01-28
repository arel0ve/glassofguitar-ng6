import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SongApiService} from '../api/song-api/song-api.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss']
})
export class WorkspacePageComponent implements OnInit, OnDestroy {

  artistName: Observable<string>;
  songName: Observable<string>;
  navigationSubscription;
  author: any;
  song: any;

  constructor(
      private getSongService: SongApiService,
      private route: ActivatedRoute,
      private exitRouter: Router
  ) {
    this.navigationSubscription = this.exitRouter.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    this.route.params.subscribe(value => {
      this.artistName = value.user || '0';
      this.songName = value.song || '0';

      this.getSongService.getSong({
        artistName: this.artistName,
        songName: this.songName
      }).subscribe(song => {
        this.song = song;
        this.author = song['author'];
      });
    });
  }

  ngOnInit() {
    this.author = {
      hatColor: '#273554',
    };
    this.song = {};
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
