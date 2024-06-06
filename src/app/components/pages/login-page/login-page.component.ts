import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { AdminDashboardComponent } from '../../admin-dashboard/admin-dashboard/admin-dashboard.component';
import { InstructorDashboardComponent } from '../../instructor-dashboard/instructor-dashboard/instructor-dashboard.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginData = {
    employeeId: '',
    employeePassword: ''
  }
  constructor(private router: Router, private service: EmployeeService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginData)
    this.service.login(this.loginData).subscribe(
      (data: any) => {
        console.log('Login success:', data);
  
        const jwtToken = data.jwtToken;
        const employee = data.employee;
        const role = employee.roles[0].roleName;
        console.log(role);

  
        this.auth.setToken(jwtToken);
        this.auth.setRoles(role);
        this.auth.setEmployeeId(employee.employeeId);
  
        console.log('Token:', jwtToken);
        console.log('Employee:', employee);
        console.log(role)
        localStorage.setItem('role',role);
  
          if (role === 'Admin') {
          
           alert("Welcome Admin...!!!")
            this.router.navigate(['/admin-dashboard']);
            
          }else if (role === 'TeamLead') {
            alert("Welcome Team Lead...!!!")
            this.router.navigate(['/instructor-dashboard']);
          }
           else if (role === 'Developer') {
            alert("Welcome Developer...!!!")
            this.router.navigate(['/user-dashboard']);

          } else if (role === 'Tester') {
            alert("Welcome Tester...!!!")
            this.router.navigate(['/user-dashboard']);
          
          }
           else {
            alert("InValid Credentials")
          }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
  


}
