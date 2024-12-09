import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  totalTasks: number = 0;
  completedTasks: number = 0;
  incompleteTasks: number = 0;
  employeeId: string;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeId = localStorage.getItem('employeeId') || '';
    if (this.employeeId) {
      this.fetchTaskCountByEmployeeId();
    } else {
      console.error('Employee ID not found in local storage');
    }
  }

  // // Method to fetch task count by employee ID
  // fetchTaskCountByEmployeeId(): void {
  //   this.employeeService.getTaskCountByEmployeeId(this.employeeId).subscribe(
  //     (taskCount: number) => {
  //       this.totalTasks = taskCount; // API should directly return a number
  //     },
  //     (error: any) => {
  //       console.error('Error fetching task count by employee ID', error);
  //     }
  //   );
  // }

  
  // Method to fetch task count by employee ID
fetchTaskCountByEmployeeId(): void {
  this.totalTasks = 0; // Default value to handle cases where API is slow or fails

  this.employeeService.getTaskCountByEmployeeId(this.employeeId).subscribe(
    (taskCount: number) => {
      this.totalTasks = taskCount || 0; // Ensure taskCount is valid; fallback to 0
    },
    (error: any) => {
      console.error('Error fetching task count by employee ID:', error);
      this.totalTasks = 0; // Display 0 in case of an error
    }
  );
}


  fetchTaskStatusCount(): void {
    this.employeeService
      .getTaskStatusCountByEmployeeId(this.employeeId)
      .subscribe(
        (taskStatusCount) => {
          this.completedTasks = taskStatusCount['completed'] || 0;
          this.incompleteTasks = taskStatusCount['incomplete'] || 0;
        },
        (error) => {
          console.error('Error fetching task status count', error);
        }
      );
  }

  navigateToTaskTrack(): void {
    this.router.navigate(['/Task-Track']);
  }
}
