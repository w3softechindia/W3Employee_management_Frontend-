import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/employee.service';
import { Course } from 'src/app/Models/Course';

@Component({
  selector: 'app-instructor-add-courses',
  templateUrl: './instructor-add-courses.component.html',
  styleUrls: ['./instructor-add-courses.component.scss']
})
export class InstructorAddCoursesComponent implements OnInit {
  courseForm: FormGroup;
  popupMessage:string | null = null;
  textcolor:string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon:SafeHtml;
  isSuccess:boolean;
  courseNameStatus:boolean;
  courseList:Course[];
  courseNames:string[];
  constructor(private fb: FormBuilder, private employeeService: EmployeeService,private sanitizer: DomSanitizer) { 
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
  }
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required,this.noDirtyDataValidator(), Validators.maxLength(20)]],
      courseDuration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      subCourses: this.fb.array([]) // Initialize the FormArray
    }, { validators: this.validateSubCoursesDuration });
  
  }
  showError(message: string) {
    this.popupType = 'error';
   this.popupIcon=this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor= 'red';
    this.isSuccess=false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon=this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
   this.textcolor= '#1bbf72';
   this.isSuccess=true;
  }
  closePopup() {
    this.popupMessage = null;
  }
  createSubCourse(): FormGroup {
    return this.fb.group({
      subCourseName: ['', Validators.required, Validators.maxLength(20)],
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
      
      this.showError("Please fill in all required fields correctly.");
      return;
    }

    this.employeeService.addCourse(this.courseForm.value).subscribe(
      response => {
        console.log('Course added successfully', response);
   
        this.courseForm.reset();
        this.showSuccess("Course Added Successfully");
      },
      error => {
        console.error('Error adding course', error);
      
        this.showError("Course Not Added");
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
  validateCourseName(){
    const coursename=this.courseForm?.get('courseName')?.value;
    this.employeeService.getAllCourseDetails().subscribe(
      (data:any)=>{
        this.courseList=data;
        console.log("getting courselist",data);
        this.courseNames=this.courseList.map(course=>course.courseName);
        this.courseNameStatus=this.courseNames.includes(coursename);
        console.log("courseNameStatus value",this.courseNameStatus);
      },
      (error:any)=>{
        console.log("error in fetching courses",error);
      }
    );
    }
  
  }

