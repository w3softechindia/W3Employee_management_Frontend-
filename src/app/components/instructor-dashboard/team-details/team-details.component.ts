import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../employee.service';
import { Team } from '../../../Models/Team';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {
  employees: Employee[];
  team: Team;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    const teamName = this.route.snapshot.params['teamName'];
    if (teamName) {
      this.employeeService.getTeamByName(teamName).subscribe((data: Team) => {
        console.log(data);
        this.team = data;
        this.employees = this.team.employee;

        // Load employee photos after fetching employee data
        this.loadEmployeePhotos();
      });
    }
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployeeFromTeam(employeeId).subscribe(
      data => {
        console.log('Employee deleted successfully:', data);
        // Optionally remove the deleted employee from this.employees array to reflect deletion in UI
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
            emp.photoUrl = reader.result as string; // Assuming Employee model has a photoUrl property
          };
          reader.readAsDataURL(data);
        },
        (error: any) => {
          console.error('Error loading photo for employee:', emp.employeeId, error);
        }
      );
    });
  }
}
