import { TestBed, inject } from '@angular/core/testing';

import { VerifyService } from './verify.service';

describe('VerifyService', () => {
  const verifyApi = jasmine.createSpy('VerifyService');
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: VerifyService, useValue: verifyApi
        }
      ]
    });
  });

  it('should be created', inject([VerifyService], (service: VerifyService) => {
    expect(service).toBeTruthy();
  }));
});
