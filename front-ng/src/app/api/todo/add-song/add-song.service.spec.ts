import { TestBed, inject } from '@angular/core/testing';

import { AddSongService } from './add-song.service';

describe('AddSongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddSongService]
    });
  });

  it('should be created', inject([AddSongService], (service: AddSongService) => {
    expect(service).toBeTruthy();
  }));
});
