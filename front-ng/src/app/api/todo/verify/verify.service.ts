import { Injectable } from '@angular/core';
import {HttpService} from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http: HttpService) { }

  doVerify({login, password, verifyCode}) {
    return this.http.post('verify',
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
