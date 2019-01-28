import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.scss']
})
export class SonglistComponent implements OnInit {

  @Input() songs;

  constructor() { }

  ngOnInit() {
  }

}
