import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  @Input() user;

  constructor(private exitRouter: Router) { }

  ngOnInit() {
  }

  showFullImage() {
    this.exitRouter.navigate(['/todo/avatar'], { queryParams: { login: this.user.login } });
  }

}
