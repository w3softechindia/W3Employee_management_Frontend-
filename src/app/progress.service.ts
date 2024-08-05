import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressSubject = new BehaviorSubject<number>(0);
  private totalSubCoursesSubject = new BehaviorSubject<number>(0);

  progress$ = this.progressSubject.asObservable();
  totalSubCourses$ = this.totalSubCoursesSubject.asObservable();

  updateProgress(progress: number, totalSubCourses: number): void {
    this.progressSubject.next(progress);
    this.totalSubCoursesSubject.next(totalSubCourses);
  }
}
