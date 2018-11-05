import { TestBed, inject } from '@angular/core/testing';

import { GetUserService } from './get-user.service';

describe('GetUserService', () => {
  const apiGetUserService = jasmine.createSpy('GetUserService');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GetUserService, useValue: apiGetUserService
        }
      ]
    });
  });

  it('should be created', inject([GetUserService], (service: GetUserService) => {
    expect(service).toBeTruthy();
  }));

});
