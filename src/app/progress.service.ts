import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<number>(0);
  private totalSubCoursesSubject = new BehaviorSubject<number>(0);
  private courseCompletedSubject = new BehaviorSubject<boolean>(false);

  progress$ = this.progressSubject.asObservable();
  totalSubCourses$ = this.totalSubCoursesSubject.asObservable();
  courseCompleted$ = this.courseCompletedSubject.asObservable();

  updateProgress(completed: number, total: number): void {
    const progress = (completed / total) * 100;
    this.progressSubject.next(progress);
    this.totalSubCoursesSubject.next(total);
  }

  markCourseAsCompleted(courseName: string): void {
    this.courseCompletedSubject.next(true);
    // You can also implement additional logic here to persist the completion status.
  }
}




