import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { developerGuardGuard } from './developer-guard.guard';

describe('developerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => developerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
