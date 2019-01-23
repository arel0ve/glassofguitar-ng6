import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
      private http: HttpClient,
      private auth: AuthService
  ) { }

  public get(url, options) {
    return this.http.get(environment.baseApiURL + url, options);
  }

  public post(url, body, options) {
    options = Object.assign({token: this.auth.getCurrentToken()}, options);
    return this.http.post(environment.baseApiURL + url, body, options);
  }

  public put(url, body, options) {
    options = Object.assign({token: this.auth.getCurrentToken()}, options);
    return this.http.put(environment.baseApiURL + url, body, options);
  }

  public delete(url, options) {
    return this.http.delete(environment.baseApiURL + url, options);
  }
}
