import { TestBed, inject } from '@angular/core/testing';

import { SearchQueryService } from './search-query.service';

describe('SearchQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchQueryService]
    });
  });

  it('should be created', inject([SearchQueryService], (service: SearchQueryService) => {
    expect(service).toBeTruthy();
  }));
});
