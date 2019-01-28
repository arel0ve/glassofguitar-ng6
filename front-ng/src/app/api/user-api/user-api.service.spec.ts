import { TestBed, inject } from '@angular/core/testing';

import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  const apiGetUserService = jasmine.createSpy('UserApiService');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserApiService, useValue: apiGetUserService
        }
      ]
    });
  });

  it('should be created', inject([UserApiService], (service: UserApiService) => {
    expect(service).toBeTruthy();
  }));

});
