import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SaveSongService {

  constructor(private http: HttpService) { }

  saveSong({user, songId, speed, size, notes}) {
    return this.http.post('savesong',
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
