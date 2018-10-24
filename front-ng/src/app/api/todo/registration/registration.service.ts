import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  doReg({login, password, email, tag, name, birthday, place, country, hatColor}) {
    return this.http.post('api/registration',
        {
          login,
          password,
          email,
          tag,
          name,
          birthday,
          place,
          country,
          hatColor
        },
        {
          withCredentials: true,
          responseType: 'text'
        });
  }
}
