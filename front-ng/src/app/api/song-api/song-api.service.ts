import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SongApiService {

  constructor(
      private http: HttpService
  ) { }

  getSong({artist, song, version = 0}) {
    return this.http.get(
        `song/${artist}/${song}/${version}`,
        {withCredentials: true}
    )
        .pipe(
            retry(1)
        );
  }

  addSong({artist, song}) {
    return this.http.post('song',
        {
          artist,
          title: song
        },
        {
          withCredentials: true,
          responseType: 'json'
        });
  }

  saveSong({songId, speed, size, notes}) {
    return this.http.post('savesong',
        {
          songId,
          speed,
          size,
          notes
        },
        {
          withCredentials: true,
          responseType: 'json'
        });
  }

}
