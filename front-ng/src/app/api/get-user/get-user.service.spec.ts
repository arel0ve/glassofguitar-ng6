import { TestBed, inject } from '@angular/core/testing';

import { GetUserService } from './get-user.service';
import {HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {fail} from 'assert';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GetUserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let getUserService: GetUserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetUserService, HttpClient, HttpHandler]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    getUserService = TestBed.get(GetUserService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', inject([GetUserService], (service: GetUserService) => {
    expect(service).toBeTruthy();
  }));


  it('user\'s tag should be \'dev\'',
    () => {
      getUserService.getUser({login: 'arel0ve', songId: '0'}).subscribe(user => {
        expect(user['tag']).toBe('dev');
      }, fail);
  });
});
