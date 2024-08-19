import { TestBed } from '@angular/core/testing';

import { StationsServiceService } from './stations.service';

describe('StationsServiceService', () => {
  let service: StationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
