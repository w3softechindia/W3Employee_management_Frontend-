import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Course } from 'src/app/Models/Course';
import { Employee } from 'src/app/Models/Employee';
import { Team } from 'src/app/Models/Team';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent {
  team: Team | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService, 
    private employeeService : EmployeeService
  ) {}

  ngOnInit(): void {

    const employeeId = this.auth.getEmployeeId();
    if (employeeId) {
      this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
        (team: Team) => {
          this.team = team;
        },
        (error) => {
          this.errorMessage = 'Failed to load team information.';
        }
      );
    } else {
      this.errorMessage = 'Employee ID not found.';
    }
  }
}