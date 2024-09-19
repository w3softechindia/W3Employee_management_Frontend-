import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from 'src/app/Models/Task';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss'],
})
export class TaskTrackComponent implements OnInit {
  teamForm: FormGroup;
  employeeId: string;
  tasks: Task[];
  isModalVisible: boolean = false;
  modalMessage: string = '';
  selectedTask: Task | null = null;
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.getTasks(this.employeeId);
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

  updateTaskStatus(taskId: string, status: string): void {
    this.employeeService.updateTask(taskId, status).subscribe(
      (updatedTask: Task) => {
        const index = this.tasks.findIndex(
          (task) => task.taskId === updatedTask.taskId
        );
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(taskId: string): void {
    if (this.selectedFile) {
      this.employeeService.uploadTaskFile(taskId, this.selectedFile).subscribe(
        () => {
          alert('File uploaded successfully');
          this.selectedFile = null; 
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      alert('Please select a file to upload');
    }
  }

  downloadFile(taskId: string): void {
    this.employeeService.getTaskFile(taskId).subscribe(
      (file: Blob) => {
        const downloadURL = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'filename.ext'; 
        link.click();
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
}


