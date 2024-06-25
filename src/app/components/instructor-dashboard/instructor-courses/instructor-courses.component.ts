import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { EmployeeService } from 'src/app/employee.service';
import { CourseDetailModalComponent } from '../course-detail-modal/course-detail-modal.component';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;

  @ViewChild(CourseDetailModalComponent) courseDetailModal!: CourseDetailModalComponent;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.employeeService.getAllCourses()
      .subscribe(courses => this.courses = courses);
  }

  openCourseModal(course: Course): void {
    this.selectedCourse = course;
    this.courseDetailModal.openModal(course);
  }
}
