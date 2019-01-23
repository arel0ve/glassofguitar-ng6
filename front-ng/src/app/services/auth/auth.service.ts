import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: BehaviorSubject<boolean>;

  constructor() {
    this.isAuth = new BehaviorSubject(false);
  }

  public checkAuth(): void {
    this.isAuth.next(!!window.localStorage.getItem('uToken'));
  }
}
