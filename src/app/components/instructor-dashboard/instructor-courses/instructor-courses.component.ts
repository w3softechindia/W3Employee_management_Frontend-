import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course'; // Ensure Course model import path is correct
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {
  employeeId: string = '';
  courses: Course[] = [];
  error: string;
  
  constructor(private employeeService: EmployeeService, private auth: AuthService) { }
  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.getCourses();
    this.employeeId= this.auth.getEmployeeId();
  }

  getCourses(): void {
    this.employeeService.getCourses(this.employeeId).subscribe(
      (data: Set<Course>) => {
        this.courses = Array.from(data);
      },
      (error) => {
        this.error = error.message;
      }
    );
  }
}
