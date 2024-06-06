import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class adminGuard {
  constructor(private router: Router,private service : EmployeeService,private auth : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.auth.getToken() != null) {
    //   const allowedRoles = route.data['roles'] as string[];

    //   if (allowedRoles && allowedRoles.length > 0) {
    //     const userRoles = this.auth.getRoles();

    //     if (this.service.roleMatch(userRoles, allowedRoles)) {
    //       return true;
    //       this.router.navigate(['/admin-dashboard'])
    //     } else {
    //       this.router.navigate(['/notfound']);
    //       return false;
    //     }
    //   } else {
    //     // No roles specified in route data
    //     this.router.navigate(['/notfound']);
    //     return false;
    //   }
    // } else {
    //   // Token not available, redirect to login
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    const userRole = localStorage.getItem('role');
    const adminLoggedIn = userRole === 'Admin';

    // Check if the user is logged in and their role is Employer
    if (adminLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/login']);;
    }
  }
    }

