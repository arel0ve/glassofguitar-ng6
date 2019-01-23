import { Injectable } from '@angular/core';
import {HttpService} from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpService) { }

  doReg({login, password, email, tag, name, birthday, place, country, hatColor}) {
    return this.http.post('registration',
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
