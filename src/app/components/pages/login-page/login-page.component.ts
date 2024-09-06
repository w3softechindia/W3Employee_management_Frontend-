

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
  // rememberMe = false;
  // rememberMeError = '';

  constructor(private router: Router, private service: EmployeeService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.service.login(this.loginData).subscribe(
      (data: any) => {
        const jwtToken = data.jwtToken;
        const employee = data.employee;
        const role = employee.roles[0].roleName;

        this.auth.setToken(jwtToken);
        this.auth.setRoles([role]);
        this.auth.setEmployeeId(employee.employeeId);

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
      case 'LMS Admin':
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
      case 'RMS Admin':
        alert('Welcome RMS Admin');
        this.router.navigate(['/rms-navbar']);
        break;
      case 'BDM':
        alert('Welcome BDM');
        this.router.navigate(['/instructor-dashboard']);
        break;
      default:
        alert('Invalid Role');
    }
  }
}

