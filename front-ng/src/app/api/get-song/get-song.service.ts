import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class GetSongService {

  constructor(
      private http: HttpService
  ) { }

  getSong({artistName, songName}) {
    return this.http.get(
        `song/${artistName}/${songName}`,
        {withCredentials: true}
    )
        .pipe(
            retry(1)
        );
  }

}
