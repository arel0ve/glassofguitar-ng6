import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  doLogin({login, password}) {
    return this.http.post('http://localhost:9000/api/login',
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
