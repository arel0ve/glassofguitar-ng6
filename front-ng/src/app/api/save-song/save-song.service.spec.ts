import { TestBed, inject } from '@angular/core/testing';

import { SaveSongService } from './save-song.service';

describe('SaveSongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveSongService]
    });
  });

  it('should be created', inject([SaveSongService], (service: SaveSongService) => {
    expect(service).toBeTruthy();
  }));
});
