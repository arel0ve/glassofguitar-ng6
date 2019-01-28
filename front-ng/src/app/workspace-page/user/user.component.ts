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
    if (!this.user.photo) {
      this.imgSrc = 'assets/photos/no-photo.png';
    } else if (!this.user.photo.includes('https:')) {
      this.imgSrc = `assets/photos/${this.user.photo}`;
    } else {
      this.imgSrc = this.user.photo;
    }
  }

  showAvatar() {
    if (this.user['currentLogin']) {
      this.exitRouter.navigate(['/todo/avatar']);
    }
  }
}
