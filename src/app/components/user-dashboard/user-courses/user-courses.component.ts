import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from 'src/app/Models/Course';
import { EmployeeService } from 'src/app/employee.service';

@Component({
    selector: 'app-user-courses',
    templateUrl: './user-courses.component.html',
    styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {
    form: FormGroup;  
    courses: Course[] = [];
  selectedCourse: Course;

    constructor(private fb : FormBuilder, private employeeService : EmployeeService) { 
        this.form = this.fb.group({
            employeeId: ['']
          });
    }
    onSearchCourseByName(): void {
      const courseName = this.form.get('courseName')?.value;
      this.employeeService.getCourseByName(courseName).subscribe((course: Course) => {
        this.selectedCourse = course;
      });
    }
    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }
}
