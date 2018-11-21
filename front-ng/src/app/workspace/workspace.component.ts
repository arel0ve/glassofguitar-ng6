import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GetUserService} from '../api/get-user/get-user.service';
import {ShowModeService} from "../services/show-mode/show-mode.service";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  login: Observable<string>;
  songId: Observable<string>;
  navigationSubscription;
  user: any;
  song: any;

  mode = 'both';

  constructor(
      private getUser: GetUserService,
      private route: ActivatedRoute,
      private exitRouter: Router,
      private showModeService: ShowModeService
  ) {
    this.navigationSubscription = this.exitRouter.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });

    this.showModeService.mode$.subscribe(mode => {
      this.mode = mode;
    });
  }

  initialiseInvites() {
    this.route.params.subscribe(value => {
      this.login = value.user || '0';
      this.songId = value.song || '0';

      this.getUser.getUser({
        login: this.login,
        songId: this.songId
      }).subscribe(user => {
        this.user = user;
        this.song = Object.assign({name: this.user.name, tag: this.user.tag}, user['currentSong']);
      });
    });
  }

  ngOnInit() {
    this.user = {
      isLogin: 'false',
      hatColor: '#123456',
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
