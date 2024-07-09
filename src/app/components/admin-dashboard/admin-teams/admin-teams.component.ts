import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/Models/Team';
import { EmployeeService } from 'src/app/employee.service';
import { CommonModule } from '@angular/common';
 import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent implements OnInit{
  teams:Team[];
  constructor(private employeeService:EmployeeService,private  router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
    
    this.getAllTeams();
  }
  goToTeam(teamName:string):void{
    this.router.navigate(['admin-team-details',teamName]);
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
  

