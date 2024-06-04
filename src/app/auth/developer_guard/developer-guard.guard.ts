import { CanActivateFn } from '@angular/router';

export const developerGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
