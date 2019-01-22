import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Guitar } from './guitar';
import {FullscreenService} from "../services/fullscreen/fullscreen.service";
import {nextTick} from "q";

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit {

  @ViewChild('guitar') guitarRef: ElementRef;
  @ViewChild('guitarCanv') guitarCanvRef: ElementRef;
  @ViewChild('stringsCanv') stringsCanvRef: ElementRef;
  @ViewChild('infoCanv') infoCanvRef: ElementRef;

  guitar: Guitar;
  fullscreen: boolean;

  constructor(private fullscreenService: FullscreenService) { }

  ngOnInit() {
    this.fullscreen = this.fullscreenService.guitar$.value;
    this.guitar = new Guitar(this.guitarCanvRef.nativeElement, this.stringsCanvRef.nativeElement, this.infoCanvRef.nativeElement);

    window.guitar = this.guitar;

    window.addEventListener('resize', () => this.guitar.drawGuitar());

    window.addEventListener('load', () => {
      this.guitar.loadSounds().then(() => {
        this.guitar.drawGuitar();
        this.guitarRef.nativeElement.focus();
      });
    });

    this.fullscreenService.guitar$.subscribe(isFullscreen => {
      this.fullscreen = isFullscreen;
      if (this.fullscreen) {
        if (window['cordova'].platformId === 'android' && window['StatusBar']) {
          window['StatusBar'].hide();
        }
      } else {
        if (window['cordova'].platformId === 'android' && window['StatusBar']) {
          window['StatusBar'].show();
        }
      }
      setTimeout(() => {
        this.guitar.drawGuitar();
      }, 15);
    });
  }

  exitFullscreenGuitar() {
    this.fullscreenService.guitar$.next(false);
  }
}
