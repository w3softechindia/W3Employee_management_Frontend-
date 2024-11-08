import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Course } from 'src/app/Models/Course';

@Component({
  selector: 'app-admin-course-details',
  templateUrl: './admin-course-details.component.html',
  styleUrls: ['./admin-course-details.component.scss']
})
export class AdminCourseDetailsComponent implements OnInit{
  course:Course;
  courseName:string;
  constructor(private employeeService:EmployeeService,private  router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.courseName=this.route.snapshot.params['courseName'];
    this.getCourseDetails(this.courseName);
  }
getCourseDetails(courseName:string){
this.employeeService.getCourseByCourseName(courseName).subscribe(
  (data:Course)=>{
    this.course=data;
    console.log(this.course);
  },
  (error:any)=>{
    console.log("error in fetching course details",error);
  });
}
}
