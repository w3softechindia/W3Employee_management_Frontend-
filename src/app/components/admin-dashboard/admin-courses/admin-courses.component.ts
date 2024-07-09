import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { EmployeeService } from 'src/app/employee.service';
@Component({
    selector: 'app-admin-courses',
    templateUrl: './admin-courses.component.html',
    styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
    courses!:Course[];
    progress:number=30;
    constructor(private employeeService:EmployeeService,private router:Router,private  route:ActivatedRoute) { }

    ngOnInit(): void {
        this.getAllCourseDetails();
    }
    
    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }
goToCourse(courseName:string):void{
    console.log(`Navigating to course: ${courseName}`);
    this.router.navigate(['/admin-course-details',courseName]);
}
    getAllCourseDetails(){
      this.employeeService.getAllCourseDetails().subscribe(
                 (res:any)=>{
                     this.courses=res;
                     console.log(this.courses);
                 },
                 (error:any)=>{
                     console.log(error);
                 });
          }
        }