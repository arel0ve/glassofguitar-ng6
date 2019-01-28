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

  getSongsListByArtist({ artist }) {
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
}
