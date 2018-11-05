import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  beforeEach(() => {
    const registrationApi = jasmine.createSpy('RegistrationService');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RegistrationService, useValue: registrationApi
        }
      ]
    });
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
