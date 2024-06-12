import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Course } from '../../../Models/Course';
import { Employee } from '../../../Models/Employee';
import { EmployeeService } from '../../../employee.service';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  teamForm: FormGroup;
  courses: Course[] = [];
  employeeId:string;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private auth:AuthService) {
   
  }

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      course: this.fb.array([this.addTeamCourse()]),
      employee: this.fb.array([])
    });

    this.fetchCourses();
    this.employeeId=this.auth.getEmployeeId();
  }

  createTeamMember(): FormGroup {
    return this.fb.group({
      employeeId: ['', Validators.required]
    });
  }

  addTeamCourse(): FormGroup {
    return this.fb.group({
      courseName: ['', Validators.required]
    });
  }

  get employee(): FormArray {
    return this.teamForm.get('employee') as FormArray;
  }
  get course(): FormArray {
    return this.teamForm.get('course') as FormArray;
  }

  fetchCourses(): void {
    this.employeeService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

 

  addTeamMember(): void {
    this.employee.push(this.createTeamMember());
  }

  removeEmployee(index: number): void {
    this.employee.removeAt(index);
  }

  // addCourse(): void {
  //   this.course.push(this.addTeamCourse());
  // }

  // removeCourse(index: number): void {
  //   this.course.removeAt(index);
  // }

  onSubmit(): void {
    if (this.teamForm.valid) {
      console.log(this.teamForm.value);
      const team = this.teamForm.value;

      this.employeeService.addTeam(team,this.employeeId ).subscribe(
        response => {
          console.log('Team added successfully', response);
        },
        error => {
          console.error('Error adding team', error);
        }
      );
    }
  }
}
