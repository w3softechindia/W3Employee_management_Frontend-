import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/Models/Team';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-students',
  templateUrl: './instructor-students.component.html',
  styleUrls: ['./instructor-students.component.scss']
})
export class InstructorStudentsComponent implements OnInit {
  
  teams: Team[] = []; // Initialize the teams array

  constructor(private employeeService: EmployeeService, private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    const employeeId=this.auth.getEmployeeId();
    this.employeeService.getAllTeams(employeeId).subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  viewTeam(teamName: string): void {
    this.router.navigate(['/team', teamName]);
  }



}