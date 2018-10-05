import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() isLogin;
  @Input() menuColor;

  @ViewChild('searchField') searchElem: ElementRef;

  logClass: string;
  showSearch: boolean;

  constructor() { }

  ngOnInit() {
    this.showSearch = false;
    this.logClass = this.isLogin ? 'log-out' : 'log-in';
  }

  onShowSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.searchElem.nativeElement.focus();
    }
  }
}
