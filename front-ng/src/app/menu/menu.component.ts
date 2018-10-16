import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent} from 'rxjs';

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

  constructor(private http: HttpClient) { }

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
    this.http.post('http://localhost:9000/api/query',
        {
          type,
          query: e.target.value
        },
        {
          withCredentials: true,
          responseType: 'json'
        }).subscribe((searchResult: Array<string>) => {
          this.foundSongs = searchResult || [];
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
