import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from '../../../Models/Team'; // Ensure correct import
import { SubCourse } from '../../../Models/SubCourse'; // Ensure correct import
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-sessions-page',
  templateUrl: './sessions-page.component.html',
  styleUrls: ['./sessions-page.component.scss']
})
export class SessionsPageComponent implements OnInit {
  sessionForm: FormGroup;
  teamNames: string[] = []; // To hold list of team names
  subCourses: SubCourse[] = []; // To hold list of sub-courses

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: EmployeeService // Updated service injection
  ) { }

  ngOnInit(): void {
    this.sessionForm = this.fb.group({
      teamName: ['', Validators.required],
      subCourseName: ['', Validators.required],
      numberOfSessions: [1, [Validators.required, Validators.min(1)]],
      dates: this.fb.array([this.createDateControl()]), // Initialize with one date control
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      meetingLink: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });

   

    // Subscribe to numberOfSessions changes
    this.sessionForm.get('numberOfSessions')?.valueChanges.subscribe(value => {
      this.updateDates(value);
    });
  }

  get dateControls() {
    return (this.sessionForm.get('dates') as FormArray).controls as FormControl[];
  }

  createDateControl(): FormControl {
    return this.fb.control('', Validators.required);
  }

  addDate(): void {
    (this.sessionForm.get('dates') as FormArray).push(this.createDateControl());
  }

  removeDate(index: number): void {
    (this.sessionForm.get('dates') as FormArray).removeAt(index);
  }



  onTeamNameChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Type assertion
    const teamName = target.value;
  
    if (teamName) {
      this.sessionService.getSubCoursesByTeamName(teamName).subscribe(
        (subCourses: SubCourse[]) => {
          this.subCourses = subCourses; // Assuming this is the expected result
          this.sessionForm.get('subCourseName')?.reset(); // Reset the subCourseName control
        },
        error => {
          console.error('Error fetching sub-courses:', error);
        }
      );
    }
  }
  

  updateDates(numberOfSessions: number): void {
    const dates = this.sessionForm.get('dates') as FormArray;
    while (dates.length !== 0) {
      dates.removeAt(0);
    }
    for (let i = 0; i < numberOfSessions; i++) {
      dates.push(this.createDateControl());
    }
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      const formValue = this.sessionForm.value;
      this.sessionService.createSessions(
        formValue.teamName,
        formValue.subCourseName,
        formValue.numberOfSessions,
        formValue.dates,
        formValue.startTime,
        formValue.endTime,
        formValue.meetingLink
      ).subscribe(
        response => {
          console.log('Sessions created successfully:', response);
        },
        error => {
          console.error('Error creating sessions:', error);
        }
      );
    }
  }
}
