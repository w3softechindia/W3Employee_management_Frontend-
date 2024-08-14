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
  photo: any;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;

  constructor(private employeeService:EmployeeService,private authService:AuthService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    
    this.getEmployeesByRole("Developer");
  }
  switcherClassApplied = false;
  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
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
        this.employees.forEach(employee => {
          this.loadPhoto(employee);
        });
        //console.log(data);
      },
      (error) => {
        console.error('Error in fetching employees', error);
      }
    );
  }
  loadPhoto(employee: Employee): void {
    this.employeeService.getPhotoAdmin(employee.employeeId).subscribe(
      (data: Blob) => {
        console.log('Photo data:', data);
      
       const reader = new FileReader();
         reader.onload = () => {
           employee.photoUrl = reader.result as string;
           console.log('Photo URL:', employee.photoUrl);
           this.isLoading = false;
         };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        this.isLoading=false;
      }
    );
  }

}
