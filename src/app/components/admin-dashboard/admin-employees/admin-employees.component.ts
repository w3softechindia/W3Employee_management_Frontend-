import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss']
})
export class AdminEmployeesComponent implements OnInit{
  employees:Employee[];
  constructor(private employeeService:EmployeeService,private authService:AuthService,private router:Router) { }
  ngOnInit(): void {
    this.getAllEmployeeDetails();
  }
  gotoDeveloper(){
    this.router.navigate(['/developer-employees']);    
      }
      gotoTeamLead(){
        this.router.navigate(['/teamlead-employees']);    
          }
          gotoTester(){
            this.router.navigate(['/tester-employees']);    
              }
  getAllEmployeeDetails(){

    this.employeeService.getEmployeesNotAdminAfterStatus().subscribe(
      (res:any)=>{
        this.employees=res;
       console.log(this.employees[1].role);
        
        console.log("employee details",this.employees);
        

      },
      (error:any)=>{
        console.log(error);
      }
    )
  }
  getEmployeesByRole(roleName: string): void {
    this.employeeService.getEmployeesByRole(roleName).subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }
 
}
