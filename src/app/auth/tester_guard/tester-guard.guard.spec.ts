import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { testerGuardGuard } from './tester-guard.guard';

describe('testerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => testerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
