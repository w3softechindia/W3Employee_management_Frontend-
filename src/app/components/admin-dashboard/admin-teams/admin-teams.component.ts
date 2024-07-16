import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from 'src/app/Models/Team';
@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss'],
})
export class AdminTeamsComponent implements OnInit {
  teams: Team[];
  // teamEmployeeCounts: { [teamId: string]: number } = {};
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllTeams();
    // this.countEmployeesInTeams();
  }
  goToTeam(teamName: string): void {
    this.router.navigate(['admin-team-details', teamName]);
  }
  getAllTeams() {
    this.employeeService.getAllTeam().subscribe(
      (data: Team[]) => {
        this.teams = data;
        console.log(this.teams);
      },
      (error) => {
        console.error('Error in fetching teams', error);
      }
    );
    }
  }
}
