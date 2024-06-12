import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { EmployeeService } from 'src/app/employee.service';

@Component({
    selector: 'app-instructor-courses',
    templateUrl: './instructor-courses.component.html',
    styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {
    courses: Course[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.employeeService.getAllCourses()
      .subscribe(courses => this.courses = courses);
  }
}