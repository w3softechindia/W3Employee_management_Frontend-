import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { Session } from 'src/app/Models/Session';
import { ProgressService } from 'src/app/progress.service';
import { Team } from 'src/app/Models/Team';
import { AuthService } from 'src/app/auth/auth.service';
import { SubCourse } from 'src/app/Models/SubCourse';

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
  teamName: string;
  team: Team;
  errorMessage: string;
  sessions: Session[] = [];
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
    const employeeId = this.auth.getEmployeeId();
    if (employeeId) {
      this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
        (team: Team) => {
          this.team = team;
          this.teamName = team.teamName; // Ensure teamName is set
          this.loadSessions(); // Load sessions once team is fetched
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

  joinSession(session: Session): void {
    this.markComplete(session);
    if (this.team && this.team.meetingLink) {
      this.openMeetingLink(this.team.meetingLink);
    } else {
      this.errorMessage = 'Meeting link not available for the team.';
    }
  }

  markComplete(session: Session): void {
    if (!session.complete) {
      session.complete = true;
      this.updateProgress();

      // Call backend to mark session as complete
      this.http.post(`/api/sessions/complete/${session.classId}`, {})
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
    const completed = this.classes.filter((c) => c.complete).length;
    this.progressService.updateProgress(completed, this.classes.length);
  }

  openMeetingLink(link: string): void {
    window.open(link, '_blank');
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 5;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
      this.updateTransform();
    }
  }

  next(): void {
    if (this.currentIndex < this.sessions.length - 4) {
      this.currentIndex += 4;
      if (this.currentIndex >= this.sessions.length) {
        this.currentIndex = this.sessions.length - 7;
      }
      this.updateTransform();
    }
  }

  updateTransform(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 230}px)`; // 220px to account for class-box width and margin
  }

  loadSessions(): void {
    this.employeeService.getSessionsByTeamName(this.teamName).subscribe(
      (data: Session[]) => {
        this.sessions = data;
        this.initializeSessionClasses();
      },
      (error: any) => {
        console.error('Error fetching sessions', error);
      }
    );
  }

  initializeSessionClasses(): void {
    this.sessions.forEach((session, index) => {
      this.classes[index] = { ...session, complete: session.complete || false };
    });
  }

  loadSessions(): void {
    this.employeeService.getSessionsByTeamName(this.teamName).subscribe(
      (data: Session[]) => {
        this.sessions = data;
        this.initializeSessionClasses();
      },
      (error: any) => {
        console.error('Error fetching sessions', error);
      }
    );
  }

  initializeSessionClasses(): void {
    this.sessions.forEach((session, index) => {
      this.classes[index] = { ...session, complete: session.complete || false };
    });
  }
}
