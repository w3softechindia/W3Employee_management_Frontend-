// src/app/models/team.model.ts

import { Course } from "./Course";
import { Employee } from "./Employee";


export class Team {
  teamName: string;
  teamLeadId: string;
  employee: Employee[];
  course: Course[];
}
