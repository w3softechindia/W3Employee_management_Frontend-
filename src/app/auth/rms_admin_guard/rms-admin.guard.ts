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
      const userRole = localStorage.getItem('role');
      const rms_admin = userRole === 'RMS Admin';
  
      // Check if the user is logged in and their role is Developer
      if (rms_admin) {
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
    }
};
