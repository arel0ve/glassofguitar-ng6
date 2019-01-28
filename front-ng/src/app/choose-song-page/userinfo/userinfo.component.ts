import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
