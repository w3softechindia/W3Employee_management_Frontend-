import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from '../../auth.service';

export class AdminGuard {
  constructor(private router: Router,private service : EmployeeService,private auth : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.getToken()!=null){
      const role=route.data['roles'] as Array<string>;

      if(role){
        const match=this.service.roleMatch(role);

        if(match){
          return true;  
        }
        else{
          this.router.navigate(['/**']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}

