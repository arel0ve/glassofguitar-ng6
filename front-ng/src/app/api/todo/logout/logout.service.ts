import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  doLogout() {
    return this.http.post('http://localhost:9000/api/logout',
        null,
        {
          responseType: 'text',
          withCredentials: true
        }
    );
  }
}
