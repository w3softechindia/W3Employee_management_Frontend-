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
  
    // relatedCoursesSlides: OwlOptions = {
    //   loop: true,
    //   margin: 10,
    //   nav: true,
    //   responsive: {
    //     0: {
    //       items: 1
    //     },
    //     600: {
    //       items: 2
    //     },
    //     1000: {
    //       items: 4
    //     }
    //   }
    // }
    // relatedCoursesSlides: OwlOptions = {
      // 	items: 1,
      // 	loop: true,
      // 	margin: 30,
      // 	nav: false,
      // 	dots: true,
      // 	autoplay: true,
      // 	smartSpeed: 1000,
      // 	autoplayHoverPause: true
    //   }
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
          console.log(" teamleads details are : ",this.teamLeads);
          }
          if(roleName=="Developer"){
            
            this.employees=data;
            console.log("developers details are :",this.employees);
          }
          if(roleName=="Tester"){
            this.employees.concat(data);
            console.log("employees details are",this.employees);
          }
           },
        (error) => {
          console.error('Error in fetching employees', error);
        }
      );
    }
   
    

    

}