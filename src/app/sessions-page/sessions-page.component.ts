import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';
import { Session } from '../Models/Session';

@Component({
  selector: 'app-sessions-page',
  templateUrl: './sessions-page.component.html',
  styleUrls: ['./sessions-page.component.scss']
})
export class SessionsPageComponent implements OnInit {
  sessionForm: FormGroup;
  teamName: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.sessionForm = this.fb.group({
      classId: ['', Validators.required],
      classDuration: ['', Validators.required],
      classDate: ['', Validators.required],
      classStatus: ['Scheduled', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      sessionNumber: ['', Validators.required],
      meetingLink: ['', Validators.required],
      timeStatus: ['Pending', Validators.required],
      complete: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    const employeeId = this.authService.getEmployeeId();
    this.employeeService.getTeamByEmployeeId(employeeId).subscribe((team) => {
      this.teamName = team.teamName;
    });
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      const session: Session = this.sessionForm.value;
      session.team = { teamName: this.teamName }; // Assuming session needs team information
      this.employeeService.createSession(session).subscribe(
        response => {
          console.log('Session created successfully', response);
          alert('Session created successfully');
          this.sessionForm.reset(); // Reset form after successful submission
        },
        error => {
          console.error('Error creating session', error);
          alert('Error creating session');
        }
      );
    }
  }
}
