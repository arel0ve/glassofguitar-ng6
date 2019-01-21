import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {SearchQueryService} from '../api/search-query/search-query.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ShowModeService} from '../services/show-mode/show-mode.service';
import {Router} from "@angular/router";

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

  @Input() isLogin;
  @Input() menuColor;

  @ViewChild('searchField') searchElem: ElementRef;

  logClass: string;
  showSearch: boolean;
  loginLink: string;
  foundSongs: any[];

  constructor(
      private searchQueryService: SearchQueryService,
      private showModeService: ShowModeService,
      private exitRouter: Router
  ) { }

  ngOnInit() {
    this.showSearch = false;
    this.foundSongs = [];
  }

  ngOnChanges() {
    this.logClass = this.isLogin === 'true' ? 'log-out' : 'log-in';
    this.loginLink = this.isLogin === 'true' ? '/todo/logout' : '/todo/login';
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
        .subscribe((searchResult: Array<string>) => {
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

  showUser() {
    if (this.showModeService.mode$.value === 'workspace') {
      this.showModeService.mode$.next('user');
    } else {
      this.showModeService.mode$.next('workspace');
    }
  }

  goToHome() {
    this.exitRouter.navigate(['/']);
  }
}
