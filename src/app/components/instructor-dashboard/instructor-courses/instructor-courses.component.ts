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
  courses: Course[] = [];
  employeeId: string;

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.getCourses();
  }

  private getCourses(): void {
    this.employeeService.getCoursesByEmployeeId(this.employeeId).subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }
}
