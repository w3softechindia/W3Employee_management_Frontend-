import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

export class employeeGuardGuard {
  constructor(private router: Router,private auth:AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    const userRole = localStorage.getItem('role');
    const employerLoggedIn = userRole === 'Employer';
    if (employerLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }
}