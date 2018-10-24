import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(private http: HttpClient) { }

  findQuery({type, query}) {
    return this.http.post('api/query',
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
