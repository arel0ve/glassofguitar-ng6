import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullscreenService {

  public guitar$: BehaviorSubject<boolean>;
  public notes$: BehaviorSubject<boolean>;

  constructor() {
    this.guitar$ = new BehaviorSubject(false);
    this.notes$ = new BehaviorSubject(false);
  }
}
