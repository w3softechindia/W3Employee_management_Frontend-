import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  employee:Employee;
  employeeId:string;
  constructor(private employeeService:EmployeeService,private auth:AuthService) { }

  ngOnInit(): void {
    this.getDetailsOfEmployee();
  }

  //get details of employee
  private getDetailsOfEmployee(){
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe((data)=>{
      console.log(data);
      this.employee=data;
    })
  }
}
