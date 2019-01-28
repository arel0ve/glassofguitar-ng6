import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {SearchQueryService} from '../api/search-query/search-query.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('showFound', [
      transition(':enter', [
        style({
          opacity: 0,
          height: '0'
        }),
        animate('.5s ease-out', style({
          opacity: 1,
          height: '*'
        })),
      ]),
      transition(':leave', [
        animate('.5s ease-in', style({
          opacity: 0,
          height: '0'
        }))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit, OnChanges {

  @ViewChild('searchField') searchElem: ElementRef;

  isLogin: boolean;

  logClass: string;
  showSearch: boolean;
  loginLink: string;
  foundSongs: any;

  constructor(
      private searchQueryService: SearchQueryService,
      private exitRouter: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.showSearch = false;
    this.foundSongs = [];
    this.authService.isAuth.subscribe((value) => {
      this.isLogin = value;
    });
  }

  ngOnChanges() {
    this.logClass = this.isLogin ? 'log-out' : 'log-in';
    this.loginLink = this.isLogin ? '/todo/logout' : '/todo/login';
    if (window['cordova'] && window['cordova'].platformId === 'android' && window['StatusBar']) {
      window['StatusBar'].backgroundColorByHexString('#4d0e1b');
    }
  }

  onShowSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.searchElem.nativeElement.focus();
    }
  }

  onSearch(e) {
    if (!e.target.value) {
      return;
    }
    const type = e.shiftKey ? 'author' : 'song';
    this.searchQueryService.findQuery({type, query: e.target.value})
        .subscribe((searchResult) => {
          this.foundSongs = searchResult || [];
          fromEvent(document, 'click')
              .subscribe((event) => {
                if (!event.target['closest'] || event.target['closest']('.search-result')) {
                  return;
                }
                this.foundSongs = [];
              });
    });

  }

  goToHome() {
    this.exitRouter.navigate(['/']);
  }
}
