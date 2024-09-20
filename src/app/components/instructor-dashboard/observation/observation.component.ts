import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from 'src/app/Models/Team';
import { Employee } from 'src/app/Models/Employee';
import { Task } from 'src/app/Models/Task';
import { EmployeeTaskStatus } from 'src/app/Models/EmployeeTaskStatus';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent {
  // teams: Team[] = [];
  // employees: Employee[] = [];
  // tasks: Task[] = [];
  // selectedEmployee: Employee | null = null;
  // selectedTask: Task | null = null;
  // taskStatuses: EmployeeTaskStatus[] = [];
  // showUpdateModal: boolean = false;
  // taskStatusForm: FormGroup;

  // constructor(
  //   private auth: AuthService,
  //   private employeeService: EmployeeService,
  //   private fb: FormBuilder
  // ) {
  //   this.taskStatusForm = this.fb.group({
  //     taskId: [''],
  //     status: ['']
  //   });
  // }

  // ngOnInit(): void {
  //   this.loadTeams();
  // }

  // loadTeams(): void {
  //   const employeeId = this.auth.getEmployeeId();
  //   this.employeeService.getAllTeams(employeeId).subscribe((data: Team[]) => {
  //     this.teams = data;
  //   });
  // }

  // loadEmployees(teamName: string): void {
  //   this.employeeService.getEmployeesByTeam(teamName).subscribe((data: Employee[]) => {
  //     this.employees = data;
  //   });
  // }

  // loadTasks(employeeId: string): void {
  //   this.employeeService.getTaskStatusByEmployee(employeeId).subscribe((data: EmployeeTaskStatus[]) => {
  //     this.taskStatuses = data;
  //   });
  // }

  // loadTaskDetails(taskId: string): void {
  //   this.employeeService.getTaskStatusByTask(taskId).subscribe((data: EmployeeTaskStatus[]) => {
  //     this.taskStatuses = data;
  //   });
  // }

  // openUpdateModal(task: Task): void {
  //   this.selectedTask = task;
  //   this.taskStatusForm.patchValue({
  //     taskId: task.taskId,
  //     status: task.status
  //   });
  //   this.showUpdateModal = true;
  // }

  // closeUpdateModal(): void {
  //   this.showUpdateModal = false;
  // }

  // updateTaskStatus(): void {
  //   if (this.taskStatusForm.valid) {
  //     const { taskId, status } = this.taskStatusForm.value;
  //     this.employeeService.updateTaskStatus(taskId, status).subscribe(
  //       response => {
  //         alert('Task status updated successfully');
  //         this.loadTasks(this.selectedEmployee?.employeeId || ''); // Reload tasks
  //         this.closeUpdateModal();
  //       },
  //       error => {
  //         console.error('Error updating task status', error);
  //         alert('Failed to update task status');
  //       }
  //     );
  //   }
  // }
}
