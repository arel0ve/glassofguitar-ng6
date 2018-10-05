import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  @Input() user;

  @ViewChild('userInfo') infoRef: ElementRef;
  @ViewChild('songs') songsRef: ElementRef;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.user.birthday) {
      const bd = new Date(this.user.birthday);
      this.user.birthday = bd.toDateString();
    }
  }

  enterInfo() {
    this.songsRef.nativeElement.classList.add('user-track-list-down');
  }

  leaveInfo() {
    this.songsRef.nativeElement.classList.remove('user-track-list-down');
  }
}
