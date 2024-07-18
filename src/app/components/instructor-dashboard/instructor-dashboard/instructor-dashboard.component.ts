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
  employeeId: string | null; 

  constructor(private employeeService: EmployeeService,private auth: AuthService) {
  }

  ngOnInit(): void {
    this.employeeId= this.auth.getEmployeeId();
    if (this.employeeId) {
      this.getTotalTeamsByTeamLead(this.employeeId); 
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
}
