import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SaveSongService {

  constructor(private http: HttpService) { }

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
