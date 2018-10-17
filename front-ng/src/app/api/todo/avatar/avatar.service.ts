import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  getAvatar() {
    return this.http.get('http://localhost:9000/api/getavatar', {withCredentials: true});
  }

  postAvatar(formData) {
    return this.http.post('http://localhost:9000/api/postavatar', formData, {withCredentials: true});
  }
}
