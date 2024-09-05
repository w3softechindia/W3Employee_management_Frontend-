import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bdmGuard } from './bdm.guard';

describe('bdmGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bdmGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
