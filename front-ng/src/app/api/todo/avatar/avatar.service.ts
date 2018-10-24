import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  getAvatar() {
    return this.http.get('api/getavatar', {withCredentials: true});
  }

  postAvatar(formData) {
    return this.http.post('api/postavatar', formData, {withCredentials: true});
  }
}
