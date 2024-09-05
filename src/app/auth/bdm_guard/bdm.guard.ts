import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../auth.service';

export class bdmGuard{
  constructor(private router: Router,private service : EmployeeService,private auth : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userRole = localStorage.getItem('role');
      const bdm = userRole === 'BDM';
  
      // Check if the user is logged in and their role is Developer
      if (bdm) {
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
    }
};
