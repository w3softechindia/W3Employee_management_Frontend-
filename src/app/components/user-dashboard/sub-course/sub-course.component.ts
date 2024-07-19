import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { SubCourse } from 'src/app/Models/SubCourse';
import { ProgressService } from 'src/app/progress.service';
import { Team } from 'src/app/Models/Team';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss'],
})
export class SubCourseComponent implements OnInit {
  subCourseName: string;
  status: string;
  updatedSubCourse: SubCourse;
  courseDuration: number;
  classes: any[] = [];
  teamName: any;
  team: Team;
  errorMessage: string;
  sessions: any;
  currentIndex: number = 0;
  transformStyle: string = 'translateX(0)';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private employeeService: EmployeeService,
    private progressService: ProgressService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.courseDuration = this.route.snapshot.params['duration'];
    this.initializeClasses(this.courseDuration);
    this.teamName = localStorage.getItem('teamName');
    const employeeId = this.auth.getEmployeeId();
    if (employeeId) {
      this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
        (team: Team) => {
          this.team = team;
        },
        (error) => {
          this.errorMessage = 'Failed to load team information.';
        }
      );
    } else {
      this.errorMessage = 'Employee ID not found.';
    }
  }

  initializeClasses(count: number): void {
    this.classes = Array.from({ length: count }, () => ({ complete: false }));
    this.updateProgress();
  }

  joinSession(index: number): void {
    this.markComplete(index);
    this.openMeetingLink(this.team.meetingLink);
  }

  markComplete(index: number): void {
    if (!this.classes[index].complete) {
      this.classes[index].complete = true;
      this.updateProgress();

      // Call backend to mark session as complete
      this.http.post(`/api/sessions/complete/${this.classes[index].classId}`, {})
        .pipe(
          catchError((error) => {
            this.errorMessage = 'Failed to mark session as complete.';
            return throwError(error);
          })
        )
        .subscribe();
    }
  }

  updateProgress(): void {
    const completed = this.classes.filter(c => c.complete).length;
    this.progressService.updateProgress(completed, this.classes.length);
  }

  openMeetingLink(link: string): void {
    window.open(link, '_blank');
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateTransform();
    }
  }

  next(): void {
    if (this.currentIndex < this.classes.length - 3) {
      this.currentIndex += 1;
      this.updateTransform();
    }
  }

  updateTransform(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 160}px)`; // 160px to account for class-box width and margin
  }
}
