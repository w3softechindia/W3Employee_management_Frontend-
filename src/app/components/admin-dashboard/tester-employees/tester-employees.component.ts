import { Component } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-tester-employees',
  templateUrl: './tester-employees.component.html',
  styleUrls: ['./tester-employees.component.scss']
})
export class TesterEmployeesComponent {
  employees:Employee[];
  
  constructor(private employeeService:EmployeeService,private authService:AuthService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    
    this.getEmployeesByRole("Tester");
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
