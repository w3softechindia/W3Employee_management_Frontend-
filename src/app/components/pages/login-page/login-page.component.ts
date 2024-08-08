

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginData = {
    employeeId: '',
    employeePassword: ''
  };
  rememberMe = false;
  rememberMeError = '';

  constructor(private router: Router, private service: EmployeeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.checkRememberedUser();
  }

  checkRememberedUser() {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('role');
    if (token && role) {
      this.redirectBasedOnRole(role);
    }
  }

  login(form: NgForm) {
    if (!this.rememberMe) {
      this.rememberMeError = 'Please click on Remember me to proceed.';
      return;
    }
  
    if (form.invalid) {
      return;
    }
  
    this.rememberMeError = ''; // Clear the error message if the checkbox is checked
  
    this.service.login(this.loginData).subscribe(
      (data: any) => {
        const jwtToken = data.jwtToken;
        const employee = data.employee;
        const role = employee.roles[0].roleName;
  
        this.auth.setToken(jwtToken);
        this.auth.setRoles([role]);
        this.auth.setEmployeeId(employee.employeeId);
  
        if (this.rememberMe) {
          localStorage.setItem('role', role);
        } else {
          sessionStorage.setItem('role', role);
        }
  
        this.redirectBasedOnRole(role);
      },
      (error: any) => {
        console.error('Login error:', error);
        this.showErrorPopup('Invalid Credentials');
      }
    );
  }
  

  showErrorPopup(message: string) {
    alert(message);
  }

  redirectBasedOnRole(role: string) {
    switch (role) {
      case 'Admin':
        alert('Welcome Admin');
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'TeamLead':
        alert('Welcome Team Lead');
        this.router.navigate(['/instructor-dashboard']);
        break;
      case 'Developer':
      case 'Tester':
        alert('Welcome Employee');
        this.router.navigate(['/user-dashboard']);
        break;
      default:
        alert('Invalid Role');
    }
  }
}

