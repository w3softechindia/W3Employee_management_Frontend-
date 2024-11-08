// src/app/models/team.model.ts
import { Course } from "./Course";
import { Employee } from "./Employee";

export interface Team {
  teamName: string;
  teamLeadId: string;
  employee: Employee[]; // List of employees in the team
  course: Course[]; // Courses associated with the team
  meetingLink: string; // Link for team meetings
  tasks: any; // Any tasks associated with the team
  description?: string; // Optional description of the team
  creationDate?: string; // Optional date when the team was created
  projectName?: string; // Optional project name associated with the team

  // Method to get the number of employees in the team
  getEmployeeCount(): number;
}

// Sample implementation for the method
export function getEmployeeCount(this: Team): number {
  return this.employee.length; // Returns the number of employees
}
