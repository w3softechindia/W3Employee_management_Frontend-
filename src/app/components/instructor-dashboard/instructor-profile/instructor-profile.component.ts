import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.scss']
})
export class InstructorProfileComponent implements OnInit {

  employee: Employee = {
    employeeId: '',
    firstName: '',
    lastName: '',
    address: '',
    webMail: '',
    webMailPassword: '',
    employeeEmail: '',
    employeePassword: '',
    phoneNumber: 0,
    role: ''

  };  
// Initialize the employee object

  employeeId: string;

  constructor(private employeeService: EmployeeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.getDetailsOfEmployee();
  }

  private getDetailsOfEmployee() {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe((data) => {
      console.log(data);
      this.employee = data;
    });

  }
}
