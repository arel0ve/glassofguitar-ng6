import { TestBed } from '@angular/core/testing';

import { GetSongService } from './get-song.service';

describe('GetSongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSongService = TestBed.get(GetSongService);
    expect(service).toBeTruthy();
  });
});
