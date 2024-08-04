import { SubCourse } from "./SubCourse";

export class Course {
  courseId: number;
  courseName: string;
  courseDuration: number;
  subCourses: SubCourse[] = []; // Initialize to an empty array
  value: any;
  progress: any;
}
