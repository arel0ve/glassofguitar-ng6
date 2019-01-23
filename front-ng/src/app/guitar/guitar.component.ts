import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Guitar } from './guitar';
import {FullscreenService} from '../services/fullscreen/fullscreen.service';

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit, OnDestroy {

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
        if (window['cordova'] && window['cordova'].platformId === 'android' && window['AndroidFullScreen']) {
          // window['StatusBar'].hide();
          window['AndroidFullScreen'].isImmersiveModeSupported(
              () => {
                window['AndroidFullScreen'].immersiveMode();
                },
              () => {
                window['AndroidFullScreen'].leanMode();
              }
              );
          screen.orientation.lock('landscape');
        }
      } else {
        if (window['cordova'] && window['cordova'].platformId === 'android' && window['AndroidFullScreen']) {
          // window['StatusBar'].show();
          window['AndroidFullScreen'].showSystemUI();
          screen.orientation.lock('portrait-primary');
          screen.orientation.unlock();
        }
      }
      setTimeout(() => {
        this.guitar.drawGuitar();
      }, 15);
    });

    document.addEventListener('volumeupbutton', () => {
      if (!this.guitar.volume) {
        this.guitar.volume = 100;
      } else {
        this.guitar.volume += 10;
      }
    });

    document.addEventListener('volumedownbutton', () => {
      if (!this.guitar.volume) {
        this.guitar.volume = 80;
      } else {
        this.guitar.volume -= 10;
      }
    });
  }

  ngOnDestroy() {
    if (window['cordova'] && window['cordova'].platformId === 'android') {
      screen.orientation.unlock();
    }
  }

  exitFullscreenGuitar() {
    this.fullscreenService.guitar$.next(false);
  }
}
