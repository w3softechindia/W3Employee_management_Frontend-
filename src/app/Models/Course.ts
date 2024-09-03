import { SubCourse } from "./SubCourse";

export class Course {
  courseId: number;
  courseName: string;
  courseDuration: number;
  subCourses: SubCourse[] = []; 
  value: any;
  progress: any;
}
