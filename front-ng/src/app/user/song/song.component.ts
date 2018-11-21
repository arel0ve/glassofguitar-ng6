import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ShowModeService} from "../../services/show-mode/show-mode.service";

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

  constructor(private router: Router, private showModeService: ShowModeService) {}

  ngOnInit() {
    this.isProgress = false;
    this.isSelected = false;

    if (this.showModeService.mode$.value === 'both') {
      this.isEnter = false;
      this.angle = Math.floor(Math.random() * 30) + (Math.random() > 0.5 ? 30 : -60);
      this.brightness = Math.abs(Math.cos(this.angle / (180 / Math.PI))) + .1;
    } else {
      this.isEnter = true;
      this.angle = 0;
      this.brightness = 1;
    }
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

  navigateToSong() {
    const author = this.song.author ? this.song.author + '/' : '';
    this.router.navigate([`/user/${author}${this.song.id}`]).then(() => {
      if (this.showModeService.mode$.value === 'user') {
        this.showModeService.mode$.next('workspace');
      }
    });
  }
}
