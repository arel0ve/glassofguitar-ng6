import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  doLogin({login, password}) {
    return this.http.post('api/login',
        {
          login,
          password
        },
        {
          withCredentials: true,
          responseType: 'text'
        });
  }
}
