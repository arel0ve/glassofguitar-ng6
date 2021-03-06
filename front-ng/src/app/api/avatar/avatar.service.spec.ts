import { TestBed, inject } from '@angular/core/testing';

import { AvatarService } from './avatar.service';

describe('AvatarService', () => {
  beforeEach(() => {
    const avatarApi = jasmine.createSpy('AvatarService');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AvatarService, useValue: avatarApi
        }
      ]
    });
  });

  it('should be created', inject([AvatarService], (service: AvatarService) => {
    expect(service).toBeTruthy();
  }));
});
