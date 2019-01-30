import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http: HttpClient,
      private auth: AuthService,
      private afAuth: AngularFireAuth
  ) { }

  public get(url, options) {
    if (this.auth.isAuth.value === true) {
      options = Object.assign({headers: {'token': this.auth.getToken()}}, options);
    }
    return this.http.get(environment.baseApiURL + url, options);
  }

  public post(url, body, options) {
    if (this.auth.isAuth.value === true) {
      options = Object.assign({headers: {'token': this.auth.getToken()}}, options);
    }
    return this.http.post(environment.baseApiURL + url, body, options);
  }

  public put(url, body, options) {
    if (this.auth.isAuth.value === true) {
      options = Object.assign({headers: {'token': this.auth.getToken()}}, options);
    }
    return this.http.put(environment.baseApiURL + url, body, options);
  }

  public delete(url, options) {
    if (this.auth.isAuth.value === true) {
      options = Object.assign({headers: {'token': this.auth.getToken()}}, options);
    }
    return this.http.delete(environment.baseApiURL + url, options);
  }

  public updateToken() {
    this.afAuth.auth.currentUser.getIdToken().then(token => this.auth.setToken(token));
  }
}
