import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from 'src/app/Models/Team';
import { SubCourse } from 'src/app/Models/SubCourse';

@Component({
  selector: 'app-sessions-page',
  templateUrl: './sessions-page.component.html',
  styleUrls: ['./sessions-page.component.scss']
})
export class SessionsPageComponent implements OnInit {
  createSessionForm: FormGroup;
  teams: Team[] = [];
  subCourses: SubCourse[] = [];
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createSessionForm = this.fb.group({
      teamName: ['', Validators.required],
      subCourseName: ['', Validators.required],
      numberOfSessions: [1, [Validators.required, Validators.min(1)]],
      dates: this.fb.array([this.createDateField()], Validators.required),
      sessionDTO: this.fb.group({
        classDuration: [60, Validators.required],
        // classStatus: ['Scheduled', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        // sessionNumber: [1, Validators.required],
      })
    });

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId();
    if (this.employeeId) {
      this.employeeService.getAllTeams(this.employeeId).subscribe(
        (teams) => {
          this.teams = teams;
        },
        (error) => console.error('Error fetching teams:', error)
      );
    }
  }

  get dates(): FormArray {
    return this.createSessionForm.get('dates') as FormArray;
  }

  createDateField(): FormGroup {
    return this.fb.group({
      date: ['', Validators.required]
    });
  }

  addDateField(): void {
    this.dates.push(this.createDateField());
  }

  removeDateField(index: number): void {
    this.dates.removeAt(index);
  }

  onNumberOfSessionsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);
    if (isNaN(value)) return;

    const currentLength = this.dates.length;

    if (value > currentLength) {
      for (let i = currentLength; i < value; i++) {
        this.addDateField();
      }
    } else if (value < currentLength) {
      for (let i = currentLength; i > value; i--) {
        this.removeDateField(i - 1);
      }
    }
  }

  onStartTimeChange(event: any): void {
    const dateTime = new Date(event.target.value);
    this.createSessionForm.get('sessionDTO.startTime')?.setValue(dateTime.toISOString());
  }

  onEndTimeChange(event: any): void {
    const dateTime = new Date(event.target.value);
    this.createSessionForm.get('sessionDTO.endTime')?.setValue(dateTime.toISOString());
  }

  onTeamChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const teamName = select.value;

    if (teamName) {
      this.employeeService.getTeamByName(teamName).subscribe(
        (team) => {
          this.subCourses = team.course.reduce((acc: SubCourse[], c) => acc.concat(c.subCourses), []);
        },
        (error) => console.error('Error fetching sub-courses:', error)
      );
    } else {
      this.subCourses = []; // Clear subCourses if no team selected
    }
  }

  onSubmit(): void {
    if (this.createSessionForm.valid) {
      const { teamName, subCourseName, sessionDTO, dates } = this.createSessionForm.value;
      const requestBody = {
        dates: dates.map((date: { date: string }) => date.date),
        sessionDTO
      };

      this.employeeService.createSessions(teamName, subCourseName, requestBody).subscribe(
        (response) => {
          console.log('Sessions created:', response);
          this.router.navigate(['/sessions']);
          alert('Sessions Created');
        },
        (error) => {
          console.error('Error creating sessions:', error);
          alert('Failed to create sessions. Please check your credentials and try again.');
        }
      );
    }
  }
}
