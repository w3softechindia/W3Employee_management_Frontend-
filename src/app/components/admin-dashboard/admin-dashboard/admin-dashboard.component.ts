import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    totalEmployees: number;
    totalTeamLeads: number;
    totalDevelopers: number;
    totalTesters: number;
    totalCourses: number;
    totalTeams:number;
    teamLeads:Employee[];
    employees:Employee[];
    photo: any;
    photoUrl: string | undefined;
    isLoading: boolean | undefined;
    constructor(private employeeService: EmployeeService, private router: Router) { }
    ngOnInit(): void {
  
      this.getTotalCourses();
      this.getTotalTeams();
      this.getTotalEmployeesByRole("TeamLead", (data) => this.totalTeamLeads = data);
      this.getTotalEmployeesByRole("Developer", (data) => this.totalDevelopers = data);
      this.getTotalEmployeesByRole("Tester", (data) => this.totalTesters = data);
      this.getEmployeesByRole("TeamLead");
      this.getEmployeesByRole("Developer");
      this.getEmployeesByRole("Tester");
     }
     
       relatedCoursesSlides = {
         loop: true,
         margin: 10,
         nav: true,
         responsive: {
           0: {
             items: 1
           },
           600: {
             items: 2
           },
           1000: {
             items: 4
           }
         }
      };
  
    
    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }
  
    sidebarSwitcherClassApplied = false;
    sidebarSwitcherToggleClass() {
        this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
    }
    navigateToCourses():void{
      this.router.navigate(['/admin-courses']);
    }
    navigateToDevelopers():void{
      this.router.navigate(['/developer-employees']);
    }
    navigateToTesters():void{
      this.router.navigate(['/tester-employees']);
    }
    navigateToTeamLeads():void{
      this.router.navigate(['/teamlead-employees']);
    }
    navigateToTeams():void{
      this.router.navigate(['/admin-teams']);
    }
    
      gotoApproved(employeeId:string){
        this.updateEmployeeStatus(employeeId, "Approved");  
        this.getEmployeesByRole("TeamLead");
        this.getEmployeesByRole("Developer");
        this.getEmployeesByRole("Tester");
      }
      gotoPending(employeeId:string){
  this.updateEmployeeStatus(employeeId, "Pending");
  this.getTotalEmployeesByRole("TeamLead", (data) => this.totalTeamLeads = data);
  this.getTotalEmployeesByRole("Developer", (data) => this.totalDevelopers = data);
  this.getTotalEmployeesByRole("Tester", (data) => this.totalTesters = data);
  this.getEmployeesByRole("TeamLead");
  this.getEmployeesByRole("Developer");
  this.getEmployeesByRole("Tester");
      }
      updateEmployeeStatus(employeeId:string,status:string){
       this.employeeService.updateEmployeeStatus(employeeId,status).subscribe(
        
          (data: string) => {
            
            console.log(data);
          },
          (error:any) => {
            console.error( error);
          }
        );
      }
    getTotalEmployeesByRole(roleName: string, callback: (data: number) => void): void {
      this.employeeService.getTotalEmployeesByRole(roleName).subscribe(
        (data: number) => {
          callback(data);
          console.log(`Total ${roleName}s: ${data}`);
        },
        (error:any) => {
          console.error(`Error fetching ${roleName}s`, error);
        }
      );
    }
    getTotalCourses(): void {
      this.employeeService.getTotalCourses().subscribe(
        (data: any) => {
          this.totalCourses = data;
          console.log(`Total Courses: ${data}`);
        },
        (error) => {
          console.error('Error in fetching total courses', error);
        }
      );
    }
    getTotalTeams(): void {
      this.employeeService.getTotalTeams().subscribe(
        (data: any) => {
          this.totalTeams = data;
          console.log(`Total Teams: ${data}`);
        },
        (error) => {
          console.error('Error in fetching total teams', error);
        }
      );
    }
    getEmployeesByRole(roleName: string): void {
      
     
      this.employeeService.getEmployeesByRole(roleName).subscribe(
        (data: Employee[]) => {
          if(roleName=="TeamLead"){
          this.teamLeads = data;
          this.teamLeads.forEach(teamLead => {
            this.loadPhoto(teamLead);
          });
          console.log(" teamleads details are : ",this.teamLeads);
          }
          if(roleName=="Developer"){
            
            this.employees=data;
            this.employees.forEach(employee => {
              this.loadPhoto(employee);
            });
            console.log("developers details are :",this.employees);
          }
          if(roleName=="Tester"){
          
            this.employees.concat(data);
            this.employees.forEach(employee => {
              this.loadPhoto(employee);
            });
            console.log("employees details are",this.employees);
          }
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