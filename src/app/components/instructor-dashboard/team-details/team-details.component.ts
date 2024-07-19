import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../employee.service';
import { Team } from '../../../Models/Team';
import { Employee } from 'src/app/Models/Employee';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  employees: Employee[] = [];
  team: Team;
  tasks: Task[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {}
  ngOnInit(): void {
    const teamName = this.route.snapshot.params['teamName'];
    if (teamName) {
      this.employeeService.getTeamByName(teamName).subscribe((data: Team) => {
        this.team = data;
        this.employees = this.team.employee;
        this.loadEmployeePhotos();
        this.loadTasks(teamName); // Load tasks for the team
      });
    }
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployeeFromTeam(employeeId).subscribe(
      () => {
        this.employees = this.employees.filter(emp => emp.employeeId !== employeeId);
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  loadEmployeePhotos(): void {
    this.employees.forEach(emp => {
      this.employeeService.getPhoto(emp.employeeId).subscribe(
        (data: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            emp.photoUrl = reader.result as string;
          };
          reader.readAsDataURL(data);
        },
        error => {
          console.error('Error loading photo for employee:', emp.employeeId, error);
        }
      );
    });
  }
  
  loadTasks(teamName: string): void {
    this.employeeService.getTasksByTeamlead(teamName).subscribe(
      (tasks: Task[]) => { 
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
}
