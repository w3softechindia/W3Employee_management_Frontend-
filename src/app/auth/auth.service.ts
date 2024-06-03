import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  constructor(private router: Router) {}

  
  

  public userLogout(){

    this.router.navigate(['/login']);
    localStorage.removeItem('jwtToken');
    
    localStorage.clear();

    localStorage.removeItem('jwtToken');

    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
  }

  public setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  public getToken():string | null {
    return localStorage.getItem('jwtToken');
  }

  public setName(name:string){
    localStorage.setItem('name',name);
  }

  public getName():any{
    return localStorage.getItem('name');
  }

  public setEmployeeId(employeeId:string){
    localStorage.setItem('employeeId',employeeId);
  }

  public getEmployeeId():any{
    return localStorage.getItem('employeeId');
  }
  
  public setRoles(role:string) {
    localStorage.setItem('role', role);
  }

  public getRole():any{
    return localStorage.getItem('role');
  }



}

