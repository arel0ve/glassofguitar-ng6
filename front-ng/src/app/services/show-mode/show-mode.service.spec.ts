import { TestBed, inject } from '@angular/core/testing';

import { ShowModeService } from './show-mode.service';

describe('ShowModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowModeService]
    });
  });

  it('should be created', inject([ShowModeService], (service: ShowModeService) => {
    expect(service).toBeTruthy();
  }));
});
