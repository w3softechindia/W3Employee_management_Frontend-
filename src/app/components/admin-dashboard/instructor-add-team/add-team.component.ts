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
      course: this.fb.array([this.addTeamCourse()]), // Correctly initialize the FormArray
      employee: this.fb.array([], Validators.required) // Initialize employee array and make it required
    });

    this.fetchCourses();
    this.employeeId = this.auth.getEmployeeId();

    // Disable the Add Team button if the employee array is empty
    this.teamForm.valueChanges.subscribe(() => {
      this.validateForm();
    });
  }

  createTeamMember(): FormGroup {
    return this.fb.group({
      employeeId: ['', Validators.required]
    });
  }

  addTeamCourse(): FormGroup {
    return this.fb.group({
      courseName: ['', Validators.required] // Ensure this matches your data structure
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
    this.validateForm(); // Re-validate the form when an employee is removed
  }

  toggleMeetingLinkInput(): void {
    this.showMeetingLinkInput = !this.showMeetingLinkInput;
  }

  validateForm(): void {
    if (this.employee.length < 1) {
      this.teamForm.get('employee')?.setErrors({ required: true });
    } else {
      this.teamForm.get('employee')?.setErrors(null);
    }
  }

  onSubmit(): void {
    this.validateForm();

    if (this.teamForm.valid) {
      const team = this.teamForm.value;
      this.employeeService.addTeam(team, this.employeeId).subscribe(
        response => {
          console.log('Team added successfully', response);
          alert('Team added successfully');
        },
        error => {
          console.error('Error adding team', error);
          alert('Team not added');
        }
      );
    }
  }
}
