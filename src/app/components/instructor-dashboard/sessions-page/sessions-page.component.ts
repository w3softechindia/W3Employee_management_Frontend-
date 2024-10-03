import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.createSessionForm = this.fb.group({
      teamName: ['', Validators.required],
      subCourseName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],

    });
  }

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
      const { teamName, subCourseName, startDate, endDate, startTime, endTime } = this.createSessionForm.value;

      // Prepare the request body
      const requestBody = {
        startDate,
        endDate,
        startTime,
        endTime
      };

      console.log('Request Body:', requestBody);

      this.employeeService.createListOfSessions(teamName, subCourseName, requestBody).subscribe(
        (response) => {
          console.log('Sessions created:', response);
          this.router.navigate(['/sessions']);
          alert('Sessions Created');
         
        },
        (error) => {
          console.error('Error creating sessions:', error);
          this.errorMessage = 'Failed to create sessions. Please check your inputs and try again.';
        }
      );
    }
  }
}
