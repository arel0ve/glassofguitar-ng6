import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongListApiService {

  constructor(
      private http: HttpService
  ) { }

  getSongsByArtist({ artist }) {
    return this.http.get(
        `songs/artist/${artist}`,
        {withCredentials: true}
    )
        .pipe(
            retry(1)
        );
  }

  getSongsByArtistAndTitle({ artist, title }) {
    return this.http.get(
        `songs/title/${artist}/${title}`,
        {withCredentials: true}
    )
        .pipe(
            retry(1)
        );
  }

  getSongsByAuthor({ login }) {
    return this.http.get(
        `user/${login}`,
        {withCredentials: true}
    )
        .pipe(
            retry(1)
        );
  }

  getMostPopularitySongs() {
    return this.http.get(
        `songs/most-popularity`,
        {withCredentials: true}
    )
        .pipe(
          retry(1)
        );
  }
}
