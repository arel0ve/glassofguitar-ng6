import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) { }

  getUser({login, songId}) {
    return this.http.get(`http://localhost:9000/api/user/${login}/${songId}`,
        {withCredentials: true});
  }
}
