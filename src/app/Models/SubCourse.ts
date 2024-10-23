// src/app/models/subCourse.model.ts
import { Course } from "./Course";
import { Session } from "./Session";

export class SubCourse {
  subCourseName: string;
  subCourseDuration: number; // Duration in minutes
  progress: any; // Progress details
  value: any; // Additional value (could be points or credits)
  progressStatus: number; // Status of progress (0-100)
  complete: boolean; // Indicates if the sub-course is complete
  course: Course; // Reference to the associated course
  sessions: Session[]; // List of sessions under this sub-course
  max: any; // Max limit (could be participants or score)
  certified: any; // Certification status or details
  updateAvailable: any; // Details about updates if available
  description?: string; // Optional description of the sub-course
  createdDate?: string; // Optional date when the sub-course was created

  // Method to get the number of completed sessions
  getCompletedSessionsCount(): number {
    return this.sessions.filter(session => session.complete).length; // Count completed sessions
  }
}
