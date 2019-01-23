import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AddSongService {

  constructor(private http: HttpService) { }

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
}
