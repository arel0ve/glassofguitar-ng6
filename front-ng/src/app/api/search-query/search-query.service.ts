import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(private http: HttpService) { }

  findQuery({type, query}) {
    return this.http.post('query',
        {
          type,
          query
        },
        {
          withCredentials: true,
          responseType: 'json'
        });
  }
}
