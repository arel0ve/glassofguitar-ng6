import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpClient) { }

  getUser({login, songId}) {
    return this.http.get(
        `api/user/${login}/${songId}`,
        {withCredentials: true}
        )
        .pipe(
            retry(1)
        );
  }
}
