// src/app/models/team.model.ts
  import { Course } from "./Course";
  import { Employee } from "./Employee";

export interface Team {
  teamName: string;
  teamLeadId: string;
  employee: Employee[];
  course: Course[];
  meetingLink: string;
  tasks: any;
}
