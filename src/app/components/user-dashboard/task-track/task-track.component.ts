import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/Models/Task';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService} from 'src/app/employee.service';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss'],
})
export class TaskTrackComponent implements OnInit {
  tasks: Task[];
  isModalVisible: boolean = false;
  modalMessage: string = '';
  selectedTask: Task | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTasks('W3Developer');
  }

  getTasks(employeeId: string): void {
    this.employeeService.getTasksByEmployeeId(employeeId).subscribe(
      (data: any) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  showModal(task: Task): void {
    this.selectedTask = task;
    this.modalMessage = `Is your task "${task.description}" completed?`;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedTask = null;
  }

  markTaskCompleted(): void {
    if (this.selectedTask) {
      this.updateTaskStatus(this.selectedTask.taskId, 'Completed');
    }
    this.closeModal();
  }

  markTaskIncomplete(): void {
    if (this.selectedTask) {
      this.updateTaskStatus(this.selectedTask.taskId, 'InComplete');
    }
    this.closeModal();
  }

   public updateTaskStatus(taskId: string, status: string) {
    this.employeeService.updateTask(taskId, status).subscribe(
      (updatedTask: Task) => {
        const index = this.tasks.findIndex(task => task.taskId === updatedTask.taskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }
}

