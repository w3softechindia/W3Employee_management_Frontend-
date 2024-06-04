import { CanActivateFn } from '@angular/router';

export const testerGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
