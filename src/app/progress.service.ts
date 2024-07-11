import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressSource = new BehaviorSubject<number>(0);
  progress$ = this.progressSource.asObservable();

  private totalSubCoursesSource = new BehaviorSubject<number>(0);
  totalSubCourses$ = this.totalSubCoursesSource.asObservable();

  updateProgress(completeSubCourses: number, totalSubCourses: number): void {
    this.totalSubCoursesSource.next(totalSubCourses);
    this.progressSource.next((completeSubCourses / totalSubCourses) * 100);
  }
}

