import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Injectable({
  providedIn: 'root'
})
export class TesterGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private service: EmployeeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRoles = this.auth.getRoles();
    const adminLoggedIn = userRoles.includes('Tester');

    // Check if the user is logged in and their role is LMS Admin
    if (adminLoggedIn) {
      return true;
    } else {
      // Redirect to login page if not authorized
      this.router.navigate(['/login']);
      return false; // Make sure to return false to prevent access
    }
  }
}
