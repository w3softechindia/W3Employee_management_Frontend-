import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  totalTasks: number = 0;

  constructor( private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchTotalTasks();
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
}
