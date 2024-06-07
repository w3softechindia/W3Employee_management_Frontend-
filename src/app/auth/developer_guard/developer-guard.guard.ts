import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private service: EmployeeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userRole = localStorage.getItem('role'); // This can be a string or null
    const allowedRoles = ['Developer', 'Tester'];

    // Check if userRole is not null and is included in allowedRoles
    if (userRole && allowedRoles.includes(userRole)) {

      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
