import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {
  numberOfCourses: number = 0;
  numberOfTeams: number = 0;
  employeeId: string | null; 

  constructor(private employeeService: EmployeeService) {
    const storedEmployeeId = localStorage.getItem('employeeId');
    this.employeeId = storedEmployeeId !== null ? storedEmployeeId : ''; 
  }

  ngOnInit(): void {
    this.getNumberOfCourses();
    if (this.employeeId) {
      this.getTotalTeamsByTeamLead(this.employeeId); 
    } else {
      console.error('Employee ID not found in local storage.');
    }
  }

  getNumberOfCourses(): void {
    this.employeeService.getNumberOfCourses().subscribe(
      (data) => {
        this.numberOfCourses = data;
        console.log('Number of courses:', this.numberOfCourses);
      },
      (error) => {
        console.error('Error fetching number of courses:', error);
      }
    );
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
