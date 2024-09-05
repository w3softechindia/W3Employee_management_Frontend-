import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rmsAdminGuard } from './rms-admin.guard';

describe('rmsAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rmsAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
