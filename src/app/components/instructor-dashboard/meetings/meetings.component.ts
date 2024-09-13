import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from 'src/app/Models/Team';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  teams: Team[] = [];
  employeeId: string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.employeeService.getAllTeams(this.employeeId).subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  joinMeeting(meetingLink: string): void {
    window.open(meetingLink, '_blank');
  }
}