import { TestBed } from '@angular/core/testing';

import { SongListApiService } from './song-list-api.service';

describe('SongListApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongListApiService = TestBed.get(SongListApiService);
    expect(service).toBeTruthy();
  });
});
