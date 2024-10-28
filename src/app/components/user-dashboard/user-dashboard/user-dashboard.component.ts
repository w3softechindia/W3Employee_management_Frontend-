import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Make sure this import is correct
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

  constructor(private employeeService: EmployeeService, private router: Router) {}  // Inject Router here

  ngOnInit(): void {
    this.employeeId = localStorage.getItem('employeeId') || '';
    if (this.employeeId) {
      this.fetchTotalTasks();
      this.fetchTaskStatusCount();
    } else {
      console.error('Employee ID not found in local storage');
    }
  }

  fetchTotalTasks(): void {
    this.employeeService.getTotalTasks().subscribe(
      (tasks) => {
        this.totalTasks = tasks.length;
      },
      (error) => {
        console.error('Error fetching tasks', error);
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
          this.totalTasks = this.completedTasks + this.incompleteTasks;
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
