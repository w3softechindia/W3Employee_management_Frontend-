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
  employeeId: string;
  photo: any;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;
  employees:Employee[];
  employeeList:Employee[];
  selectedEmployee: any;
  constructor(private employeeService:EmployeeService,private authService:AuthService,
  private router:Router) { }
  ngOnInit(): void {
    this.getAllEmployeeDetails();
  }
  showEmployeeDetails(employee: any) {
    this.selectedEmployee = employee;
  }

  hideEmployeeDetails() {
    this.selectedEmployee = null;
  }

  switcherClassApplied = false;
  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }
  isActive(route: string): boolean {
    return this.router.url.includes(route);
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
              getAllEmployeeDetails() {
                this.employeeService.getEmployeesNotAdmin().subscribe(
                  (res: Employee[]) => {
                    this.employeeList = res;
              
                    // Filter employees based on roles "developer" and "tester"
                    this.employees = this.employeeList.filter(employee => 
                      employee.roles.some(role => 
                        role.roleName === 'Developer' || role.roleName === 'Tester'|| role.roleName === 'TeamLead'
                      )
                    );
              
                    console.log("Filtered Employees:", this.employees.length);
              
                    // Load photos for the filtered employees
                    this.employees.forEach(employee => {
                      this.loadPhoto(employee);
                    });
              
                    console.log("All Employee Details:", this.employees.length);
                  },
                  (error: any) => {
                    console.error("Error fetching employee details:", error);
                  }
                );
              }
               
  getEmployeesByRole(roleName:string): void {
    this.employeeService.getEmployeesByRole(roleName).subscribe(
      (data: Employee[]) => {
        this.employees = data;
        
      },
      (error) => {
        console.error('Error fetching employees', error);
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
