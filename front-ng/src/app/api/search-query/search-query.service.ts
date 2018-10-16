import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(private http: HttpClient) { }

  findQuery({type, query}) {
    return this.http.post('http://localhost:9000/api/query',
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
