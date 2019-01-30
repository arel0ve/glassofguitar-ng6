import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: BehaviorSubject<boolean>;

  constructor(private afAuth: AngularFireAuth) {
    this.isAuth = new BehaviorSubject(false);
  }

  public checkAuth(): void {
    this.isAuth.next(!!window.localStorage.getItem('uToken'));
  }

  public getToken(): string {
    return window.localStorage.getItem('uToken');
  }

  public setToken(token: string): void {
    localStorage.setItem('uToken', token);
    this.checkAuth();
  }

  public clearToken(): void {
    localStorage.removeItem('uToken');
    this.checkAuth();
  }

  public updateToken() {
    this.afAuth.auth.currentUser.getIdToken().then(token => this.setToken(token));
  }
}
