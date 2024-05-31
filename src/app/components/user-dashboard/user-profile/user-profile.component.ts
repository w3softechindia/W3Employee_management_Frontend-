import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  employee:Employee=new Employee();
  employeeId:string;
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
  }

  getDetailsOfEmployee(){
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe((data)=>{
      console.log(data);
      this.employee=data;
    })
  }
}
