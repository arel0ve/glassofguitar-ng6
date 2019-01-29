import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpService) { }

  getAvatar(login) {
    return this.http.get(
        `avatar/${login}`,
        {
          withCredentials: true,
          responseType: 'json'
        });
  }

  postAvatar(formData) {
    return this.http.post(
        'avatar',
        formData,
        {
          withCredentials: true,
          responseType: 'json'
        });
  }
}
