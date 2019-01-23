import { Injectable } from '@angular/core';
import {retry} from 'rxjs/operators';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  constructor(private http: HttpService) { }

  getUser({login, songId}) {
    return this.http.get(
        `user/${login}/${songId}`,
        {withCredentials: true}
        )
        .pipe(
            retry(1)
        );
  }
}
