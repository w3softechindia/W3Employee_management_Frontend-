import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private progressSource = new BehaviorSubject<number>(0);
  private totalSubCoursesSource = new BehaviorSubject<number>(0);

  progress$ = this.progressSource.asObservable();
  totalSubCourses$ = this.totalSubCoursesSource.asObservable();

  updateProgress(completed: number, total: number): void {
    const progress = (completed / total) * 100;
    this.progressSource.next(progress);
  }

  setTotalSubCourses(total: number): void {
    this.totalSubCoursesSource.next(total);
  }
}
