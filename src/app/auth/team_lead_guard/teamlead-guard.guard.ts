import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})

export class TeamLeadGuard {
  constructor(private router: Router,private service : EmployeeService,private auth : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userRole = localStorage.getItem('role');
      const teamLeadLoggedIn = userRole === 'TeamLead';
  
      // Check if the user is logged in and their role is Developer
      if (teamLeadLoggedIn) {
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
    }
}
