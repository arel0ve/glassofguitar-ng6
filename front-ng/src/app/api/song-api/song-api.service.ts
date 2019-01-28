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

  getSong({artistName, songName}) {
    return this.http.get(
        `song/${artistName}/${songName}`,
        {withCredentials: true}
    )
        .pipe(
            retry(1)
        );
  }

  addSong({artist, song}) {
    return this.http.post('addsong',
        {
          artist,
          title: song
        },
        {
          withCredentials: true,
          responseType: 'text'
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
          responseType: 'text'
        });
  }

}
