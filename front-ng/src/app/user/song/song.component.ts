import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song;

  angle: number;
  brightness: number;

  isEnter: boolean;
  isProgress: boolean;
  isSelected: boolean;

  constructor() {}

  ngOnInit() {
    this.isEnter = false;
    this.isProgress = false;
    this.isSelected = false;

    this.angle = Math.floor(Math.random() * 30) + (Math.random() > 0.5 ? 30 : -60);
    this.brightness = Math.abs(Math.cos(this.angle / (180 / Math.PI))) + .1;
  }

  enterSong() {
    if (this.isProgress) {
      return;
    }

    if (!this.isEnter) {
      this.isProgress = true;
      const self = this;

      window.requestAnimationFrame(function twist() {
        self.angle += 10;
        self.brightness = Math.abs(Math.cos(self.angle / (180 / Math.PI))) + .1;

        if (self.angle < 360) {
          window.requestAnimationFrame(twist);
        } else {
          self.angle = 360;
          self.brightness = Math.abs(Math.cos(self.angle / (180 / Math.PI))) + .1;
          self.isProgress = false;
          self.isEnter = true;
        }
      });

    } else {
      this.isSelected = true;
    }
  }

  leaveSong() {
   this.isSelected = false;
  }
}
