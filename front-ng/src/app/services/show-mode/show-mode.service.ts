import { Injectable } from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowModeService {

  public mode$ = new BehaviorSubject<string>('');

  constructor() {
    if (window.screen.width > 576) {
      this.mode$.next('both');
    } else {
      this.mode$.next('workspace');
    }

    fromEvent(window, 'resize').subscribe(e => {
      if (e.currentTarget['screen']['width'] > 576) {
        this.mode$.next('both');
      } else {
        this.mode$.next('workspace');
      }
    });
  }
}
