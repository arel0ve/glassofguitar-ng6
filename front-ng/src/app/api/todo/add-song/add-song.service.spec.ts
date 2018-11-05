import { TestBed, inject } from '@angular/core/testing';

import { AddSongService } from './add-song.service';

describe('AddSongService', () => {
  const addSongApi = jasmine.createSpy('AddSongService');
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AddSongService, useValue: addSongApi
        }
      ]
    });
  });

  it('should be created', inject([AddSongService], (service: AddSongService) => {
    expect(service).toBeTruthy();
  }));
});
