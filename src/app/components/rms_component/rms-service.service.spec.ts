import { TestBed } from '@angular/core/testing';

import { RmsServiceService } from './rms-service.service';

describe('RmsServiceService', () => {
  let service: RmsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
