import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  public userLogout() {
    this.router.navigate(['/login']);
    localStorage.removeItem('jwtToken');
    sessionStorage.clear();
    localStorage.clear();
  }

  public setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public setRoles(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const rolesString = localStorage.getItem('roles');
    return rolesString ? JSON.parse(rolesString) : [];
  }

  public setName(name: string) {
    localStorage.setItem('name', name);
  }

  public getName(): any {
    return localStorage.getItem('name');
  }

  public setEmployeeId(employeeId: string) {
    localStorage.setItem('employeeId', employeeId);
  }

  public getEmployeeId(): any {
    return localStorage.getItem('employeeId');
  }
  public setCompanyId(companyId: string) {
    localStorage.setItem('companyId', companyId);
  }

  public getCompanyId(): any {
    return localStorage.getItem('companyId');
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
