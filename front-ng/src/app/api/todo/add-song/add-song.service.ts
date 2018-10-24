import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddSongService {

  constructor(private http: HttpClient) { }

  addSong({artist, song}) {
    return this.http.post('api/addsong',
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
