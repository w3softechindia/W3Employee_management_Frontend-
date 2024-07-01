import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/Models/Team';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent {
  teams:Team[];
  constructor(private employeeService:EmployeeService,private  router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    
    this.getAllTeams();
  }
    getAllTeams() {
     this.employeeService.getAllTeam().subscribe(
      (data: Team[]) => {
        this.teams = data;
      },
      (error) => {
        console.error('Error in fetching teams', error);
      }
    );
    }
  }
  

