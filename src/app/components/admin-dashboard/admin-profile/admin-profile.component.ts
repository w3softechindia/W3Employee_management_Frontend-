import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
   employee!:Employee;
  employeeId!:string;
  
  constructor(private employeeService:EmployeeService,private authService:AuthService) { }

  ngOnInit(): void {
    
    this.employeeId=(this.authService.getEmployeeId());
  this.getAdminDetails();
  }
  getAdminDetails(){

    this.employeeService.getAdminDetails(this.employeeId).subscribe(
      (res:any)=>{
        this.employee=res;
        
        console.log("admin details",this.employee);
        

      },
      (error:any)=>{
        console.log(error);
      }
    )
  }

}
