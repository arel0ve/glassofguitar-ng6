import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  const loginApi = jasmine.createSpy('LoginService');
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoginService, useValue: loginApi
        }
      ]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
