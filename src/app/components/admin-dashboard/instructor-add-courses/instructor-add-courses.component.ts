import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';

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
      courseName: ['', [Validators.required, this.noDirtyDataValidator(),Validators.minLength(6), Validators.maxLength(15)]],
      courseDuration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      subCourses: this.fb.array([]) // Initialize the FormArray
    }, { validators: this.validateSubCoursesDuration });
  }

  createSubCourse(): FormGroup {
    return this.fb.group({
      subCourseName: ['', Validators.required],
      subCourseDuration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
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
    if (this.courseForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.employeeService.addCourse(this.courseForm.value).subscribe(
      response => {
        console.log('Course added successfully', response);
        alert('Course Added Successfully');
      },
      error => {
        console.error('Error adding course', error);
        alert('Course Not Added');
      }
    );
  }

  validateSubCoursesDuration(group: AbstractControl): { [key: string]: boolean } | null {
    const courseDuration = +group.get('courseDuration')?.value || 0;
    const subCourses = group.get('subCourses') as FormArray;

    const totalSubCourseDuration = subCourses.controls.reduce((sum, control) => {
      return sum + (+control.get('subCourseDuration')?.value || 0);
    }, 0);

    return totalSubCourseDuration > courseDuration ? { durationExceeded: true } : null;
  }

  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
  }
}
