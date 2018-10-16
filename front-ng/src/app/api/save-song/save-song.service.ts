import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveSongService {

  constructor(private http: HttpClient) { }

  saveSong({user, songId, speed, size, notes}) {
    return this.http.post('http://localhost:9000/api/savesong',
        {
          user,
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
