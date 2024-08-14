import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private progressSource = new BehaviorSubject<number>(0);
  private totalSource = new BehaviorSubject<number>(10); // You can adjust based on total number of sessions

  progress$ = this.progressSource.asObservable();
  totalSubCourses$ = this.totalSource.asObservable();

  updateProgress(completed: number, total: number) {
    const progress = (completed / total) * 100;
    this.progressSource.next(progress);
  }
}
