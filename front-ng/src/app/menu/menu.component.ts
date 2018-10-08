import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.showSearch = false;
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
}
