import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {
  numberOfTeams: number = 0;
  numberOfEmployees: number = 0;  // Add this line
  employeeId: string | null;

  constructor(private employeeService: EmployeeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    if (this.employeeId) {
      this.getTotalTeamsByTeamLead(this.employeeId);
      this.getEmployeeCountByTeamLead(this.employeeId);  // Add this line
    } else {
      console.error('Employee ID not found in local storage.');
    }
  }

  getTotalTeamsByTeamLead(employeeId: string): void {
    this.employeeService.getTotalTeamsByTeamLead(employeeId).subscribe(
      (data) => {
        this.numberOfTeams = data;
        console.log('Number of teams:', this.numberOfTeams);
      },
      (error) => {
        console.error('Error fetching number of teams:', error);
      }
    );
  }

  getEmployeeCountByTeamLead(employeeId: string): void {  // Add this method
    this.employeeService.getEmployeeCountByTeamLead(employeeId).subscribe(
      (data) => {
        this.numberOfEmployees = data;
        console.log('Number of employees:', this.numberOfEmployees);
      },
      (error) => {
        console.error('Error fetching number of employees:', error);
      }
    );
  }
}
