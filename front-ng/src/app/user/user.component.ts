import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnChanges {

  @Input() user;

  @ViewChild('userInfo') infoRef: ElementRef;
  @ViewChild('songs') songsRef: ElementRef;

  imgSrc = '';

  constructor(private exitRouter: Router) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.user.birthday) {
      const bd = new Date(this.user.birthday);
      this.user.birthday = bd.toDateString();
    }
    if (!this.user.photo) {
      this.imgSrc = '../../assets/photos/no-photo.png';
    } else if (!this.user.photo.includes('https:')) {
      this.imgSrc = `../../assets/photos/${this.user.photo}`;
    } else {
      this.imgSrc = this.user.photo;
    }
  }

  enterInfo() {
    this.songsRef.nativeElement.classList.add('user-track-list-down');
  }

  leaveInfo() {
    this.songsRef.nativeElement.classList.remove('user-track-list-down');
  }

  showAvatar() {
    if (this.user['currentLogin']) {
      this.exitRouter.navigateByUrl('/todo/avatar');
    }
  }
}
