import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teamleadGuardGuard } from './teamlead-guard.guard';

describe('teamleadGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teamleadGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
