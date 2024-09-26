// src/app/models/employee-task-status.model.ts
export interface EmployeeTaskStatus {
  id: number;
  status: string;
  employee: {
    employeeId: string;
  };
  task: {
    taskId: string;
  };
}
