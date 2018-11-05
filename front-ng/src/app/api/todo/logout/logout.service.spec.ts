import { TestBed, inject } from '@angular/core/testing';

import { LogoutService } from './logout.service';

describe('LogoutService', () => {
  beforeEach(() => {
    const logoutApi = jasmine.createSpy('LogoutService');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LogoutService, useValue: logoutApi
        }
      ]
    });
  });

  it('should be created', inject([LogoutService], (service: LogoutService) => {
    expect(service).toBeTruthy();
  }));
});
