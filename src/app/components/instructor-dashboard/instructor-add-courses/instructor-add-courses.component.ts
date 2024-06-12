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

  constructor(private fb: FormBuilder, private employeeService : EmployeeService) { 
   
  }

  ngOnInit(): void { 
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseDuration: ['', Validators.required],
      subCourses: this.fb.array([]) // Initialize the FormArray
    });
  }

  createSubCourse(): FormGroup {
    return this.fb.group({
      subCourseName: ['',Validators.required],
      subCourseDuration: ['',Validators.required]
    });
  }
  get subCourses(): FormArray {
    return this.courseForm.get('subCourses') as FormArray;
  }

  addSubCourse(): void {
    this.subCourses.push(this.createSubCourse());
  }

  removeSubCourse(index: number): void {
    this.subCourses.removeAt(index);
  }

  addCourse() {
      this.employeeService.addCourse(this.courseForm.value).subscribe(
        response => {
          console.log('Course added successfully', response);
        },
        error => {
          console.error('Error adding course', error);
        }
      );
  }
}