// src/app/models/course.model.ts

import { SubCourse } from "./SubCourse";

export class Course {
  courseName: string;
  courseDuration: number;
  subCourses: SubCourse[];
  value: any;
  progress: any;
}
