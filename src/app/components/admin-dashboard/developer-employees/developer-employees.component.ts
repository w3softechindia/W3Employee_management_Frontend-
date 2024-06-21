import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-developer-employees',
  templateUrl: './developer-employees.component.html',
  styleUrls: ['./developer-employees.component.scss']
})
export class DeveloperEmployeesComponent implements OnInit {
  employees:Employee[];

  constructor(private employeeService:EmployeeService,private authService:AuthService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    
    this.getEmployeesByRole("Developer");
  }
  
  gotoTeamLead(){
    this.router.navigate(['/teamlead-employees']);    
      }
      gotoTester(){
        this.router.navigate(['/tester-employees']);    
          }

  getEmployeesByRole(roleName: string): void {
    
   
    this.employeeService.getEmployeesByRole(roleName).subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error in fetching employees', error);
      }
    );
  }
}
