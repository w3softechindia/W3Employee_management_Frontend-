// src/app/models/subCourse.model.ts
import { Course } from "./Course";
import { Session } from "./Session";

export class SubCourse {
  subCourseName: string;
  subCourseDuration: number;
  progress: any;
  value: any;
  progressStatus: number;
  complete: boolean;
  course: Course;
  sessions: Session[];
  max: any;
  certified: any;
  updateAvailable: any;
}
