import { TestBed } from '@angular/core/testing';

import { SongApiService } from './song-api.service';

describe('SongApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongApiService = TestBed.get(SongApiService);
    expect(service).toBeTruthy();
  });
});
