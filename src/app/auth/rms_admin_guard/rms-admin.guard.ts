import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class rmsAdminGuard{
  constructor(private router: Router,private service : EmployeeService,private auth : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRoles = this.auth.getRoles();
    const adminLoggedIn = userRoles.includes('RMS Admin');

    // Check if the user is logged in and their role is LMS Admin
    if (adminLoggedIn) {
      return true;
    } else {
      // Redirect to login page if not authorized
      this.router.navigate(['/login']);
      return false; // Make sure to return false to prevent access
    }
  }
};
