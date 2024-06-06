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
    const userRole = localStorage.getItem('role');
    const testerLoggedIn = userRole === 'Tester';

    // Check if the user is logged in and their role is Tester
    if (testerLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
