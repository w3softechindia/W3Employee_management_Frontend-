import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from 'src/app/Models/Team';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.scss']
})
export class AssignTasksComponent implements OnInit {
  assignTasksForm: FormGroup;
  teams: Team[] = [];
  employeeId: string;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private auth: AuthService) {}

  ngOnInit(): void {
    this.assignTasksForm = this.fb.group({
      teamName: ['', Validators.required],
      tasks: this.fb.array([this.createTask()])
    });

    this.employeeId = this.auth.getEmployeeId();
    this.fetchTeams();
  }

  createTask(): FormGroup {
    return this.fb.group({
      taskId: ['', Validators.required], 
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  get tasks(): FormArray {
    return this.assignTasksForm.get('tasks') as FormArray;
  }

  fetchTeams(): void {
    this.employeeService.getAllTeams(this.employeeId).subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  addTask(): void {
    this.tasks.push(this.createTask());
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

  onSubmit(): void {
    if (this.assignTasksForm.valid) {
      const tasks = this.assignTasksForm.value;
      this.employeeService.assignTasksToTeam(tasks.tasks, tasks.teamName).subscribe(
        response => {
          console.log('Tasks assigned successfully', response);
          alert("Tasks assigned successfully");
         
        },
        error => {
          console.error('Error assigning tasks', error);
          alert("Tasks not assigned");
        }
      );
    }
  }
}
