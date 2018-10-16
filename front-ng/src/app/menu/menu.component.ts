import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {SearchQueryService} from '../api/search-query/search-query.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() login;
  @Input() isLogin;
  @Input() menuColor;

  @ViewChild('searchField') searchElem: ElementRef;

  logClass: string;
  showSearch: boolean;
  loginLink: string;
  foundSongs: any[];

  constructor(private searchQueryService: SearchQueryService) { }

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
          console.log(this.foundSongs);
          fromEvent(document, 'click')
              .subscribe((event) => {
                // @ts-ignore
                if (event.target.closest('.search-result')) {
                  return;
                }
                this.foundSongs = [];
              });
    });

  }
}
