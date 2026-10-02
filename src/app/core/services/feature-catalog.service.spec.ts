import { TestBed } from '@angular/core/testing';

import { FeatureCatalogService } from './feature-catalog.service';

describe('FeatureCatalogService', () => {
  let service: FeatureCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureCatalogService);
  });

  it('should expose the full feature catalog initially', () => {
    expect(service.filteredFeatures().length).toBe(10);
  });

  it('should filter features without mutating the source collection', () => {
    service.setSearch('signals');

    expect(service.filteredFeatures().map(({ id }) => id)).toEqual(['signals']);
    expect(service.features().length).toBe(10);
  });
});
