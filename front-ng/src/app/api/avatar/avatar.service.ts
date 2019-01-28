import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpService) { }

  getAvatar() {
    return this.http.get(
        'getavatar',
        {
          withCredentials: true
        });
  }

  postAvatar(formData) {
    return this.http.post(
        'postavatar',
        formData,
        {
          withCredentials: true,
          responseType: 'text'
        });
  }
}
