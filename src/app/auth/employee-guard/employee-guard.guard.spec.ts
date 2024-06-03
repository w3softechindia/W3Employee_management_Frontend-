import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeGuardGuard } from './employee-guard.guard';

describe('employeeGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
