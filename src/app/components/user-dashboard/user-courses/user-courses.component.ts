import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.scss'],
})
export class UserCoursesComponent implements OnInit {
  form: FormGroup;
  courses: Course[] = [];
  selectedCourse: Course;
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      employeeId: [''],
    });
  }
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
  // Tabs
  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.currentTab = tab;
  }

  navigation(courseName: string) {
    this.router.navigate(['/active-courses', courseName]);
  }
}
