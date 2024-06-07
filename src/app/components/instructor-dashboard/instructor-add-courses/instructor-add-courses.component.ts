import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Course } from 'src/app/Models/Course';
import { EmployeeService } from 'src/app/employee.service';
import { SubCourse } from 'src/app/Models/SubCourse';

@Component({
  selector: 'app-instructor-add-courses',
  templateUrl: './instructor-add-courses.component.html',
  styleUrls: ['./instructor-add-courses.component.scss']
})
export class InstructorAddCoursesComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseDuration: ['', Validators.required],
      subCourses: this.fb.array([])
    });
  }

  get subCourses(): FormArray {
    return this.courseForm.get('subCourses') as FormArray;
  }

  addSubCourse() {
    const subCourseForm = this.fb.group({
      subCourseName: ['', Validators.required],
      subCourseDuration: ['', Validators.required]
    });
    this.subCourses.push(subCourseForm);
  }

  removeSubCourse(index: number) {
    this.subCourses.removeAt(index);
  }

  addCourse() {
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;
      this.employeeService.addCourse(course).subscribe(response => {
        console.log('Course added successfully:', response);
      }, error => {
        console.error('Error adding course:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
