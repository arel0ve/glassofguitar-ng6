import { TestBed, inject } from '@angular/core/testing';

import { SaveSongService } from './save-song.service';

describe('SaveSongService', () => {
  beforeEach(() => {
    const saveSongApi = jasmine.createSpy('SaveSongService');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SaveSongService, useValue: saveSongApi
        }
      ]
    });
  });

  it('should be created', inject([SaveSongService], (service: SaveSongService) => {
    expect(service).toBeTruthy();
  }));
});
