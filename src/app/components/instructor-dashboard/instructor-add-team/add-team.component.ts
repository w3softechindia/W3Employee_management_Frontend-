import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Course } from '../../../Models/Course';
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
  employeeId: string;
  showMeetingLinkInput: boolean = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      meetingLink: ['', Validators.required],
      course: this.fb.array([this.addTeamCourse()]),
      employee: this.fb.array([])
    });

    this.fetchCourses();
    this.employeeId = this.auth.getEmployeeId();
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

  toggleMeetingLinkInput(): void {
    this.showMeetingLinkInput = !this.showMeetingLinkInput;
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      console.log(this.teamForm.value);
      const team = this.teamForm.value;

      this.employeeService.addTeam(team, this.employeeId).subscribe(
        response => {
          console.log('Team added successfully', response);
          alert("Team added successfully");
        },
        error => {
          console.error('Error adding team', error);
          alert("Team not added");
        }
      );
    }
  }
}
