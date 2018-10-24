import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpClient) { }

  doVerify({login, password, verifyCode}) {
    return this.http.post('api/verify',
        {
          login,
          password,
          verifyCode
        },
        {
          withCredentials: true,
          responseType: 'text'
        });
  }
}
