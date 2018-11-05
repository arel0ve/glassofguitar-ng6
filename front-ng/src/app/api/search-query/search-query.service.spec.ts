import { TestBed, inject } from '@angular/core/testing';

import { SearchQueryService } from './search-query.service';

describe('SearchQueryService', () => {
  beforeEach(() => {
    const searchQueryApi = jasmine.createSpy('SearchQueryService');
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchQueryService, useValue: searchQueryApi
        }
      ]
    });
  });

  it('should be created', inject([SearchQueryService], (service: SearchQueryService) => {
    expect(service).toBeTruthy();
  }));
});
