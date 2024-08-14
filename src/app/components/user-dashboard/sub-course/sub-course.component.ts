// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { EmployeeService } from 'src/app/employee.service';
// import { Session } from 'src/app/Models/Session';
// import { ProgressService } from 'src/app/progress.service';
// import { Team } from 'src/app/Models/Team';
// import { AuthService } from 'src/app/auth/auth.service';
// import { SubCourse } from 'src/app/Models/SubCourse';

// @Component({
//   selector: 'app-sub-course',
//   templateUrl: './sub-course.component.html',
//   styleUrls: ['./sub-course.component.scss'],
// })
// export class SubCourseComponent implements OnInit {
// //   subCourseName: string;
// //   status: string;
// //   updatedSubCourse: SubCourse;
// //   courseDuration: number;
// //   classes: any[] = [];
// //   teamName: string;
// //   team: Team;
// //   errorMessage: string;
// //   sessions: Session[] = [];
// //   currentIndex: number = 0;
// //   transformStyle: string = 'translateX(0)';

// //   constructor(
// //     private route: ActivatedRoute,
// //     private http: HttpClient,
// //     private employeeService: EmployeeService,
// //     private progressService: ProgressService,
// //     private auth: AuthService
// //   ) {}

// //   ngOnInit(): void {
// //     this.courseDuration = this.route.snapshot.params['duration'];
// //     this.initializeClasses(this.courseDuration);
// //     const employeeId = this.auth.getEmployeeId();
// //     if (employeeId) {
// //       this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
// //         (team: Team) => {
// //           this.team = team;
// //           this.teamName = team.teamName; // Ensure teamName is set
// //           this.loadSessions(); // Load sessions once team is fetched
// //         },
// //         (error) => {
// //           this.errorMessage = 'Failed to load team information.';
// //         }
// //       );
// //     } else {
// //       this.errorMessage = 'Employee ID not found.';
// //     }
// //   }

// //   initializeClasses(count: number): void {
// //     this.classes = Array.from({ length: count }, () => ({ complete: false }));
// //     this.updateProgress();
// //   }

// //   joinSession(session: Session): void {
// //     this.markComplete(session);
// //     if (this.team && this.team.meetingLink) {
// //       this.openMeetingLink(this.team.meetingLink);
// //     } else {
// //       this.errorMessage = 'Meeting link not available for the team.';
// //     }
// //   }

// //   markComplete(session: Session): void {
// //     if (!session.complete) {
// //       session.complete = true;
// //       this.updateProgress();

// //       // Call backend to mark session as complete
// //       this.http
// //         .post(`/api/sessions/complete/${session.classId}`, {})
// //         .pipe(
// //           catchError((error) => {
// //             this.errorMessage = 'Failed to mark session as complete.';
// //             return throwError(error);
// //           })
// //         )
// //         .subscribe(() => {
// //           session.progress = 10;  // Update progress to 10% for each session completion
// //           this.updateProgress();
// //         });
// //     }
// //   }

// //   updateProgress(): void {
// //     const completed = this.sessions.filter((session) => session.complete).length;
// //     const progress = completed * 10; // Assuming each session completion contributes 10% progress
// //     this.progressService.updateProgress(progress, 100); // Update with total progress and max value
// //   }

// //   openMeetingLink(link: string): void {
// //     window.open(link, '_blank');
// //   }

// //   prev(): void {
// //     if (this.currentIndex > 0) {
// //       this.currentIndex -= 5;
// //       if (this.currentIndex < 0) {
// //         this.currentIndex = 0;
// //       }
// //       this.updateTransform();
// //     }
// //   }

// //   next(): void {
// //     if (this.currentIndex < this.sessions.length - 4) {
// //       this.currentIndex += 4;
// //       if (this.currentIndex >= this.sessions.length) {
// //         this.currentIndex = this.sessions.length - 7;
// //       }
// //       this.updateTransform();
// //     }
// //   }

// //   updateTransform(): void {
// //     this.transformStyle = `translateX(-${this.currentIndex * 230}px)`; // 230px to account for class-box width and margin
// //   }

// //   loadSessions(): void {
// //     this.employeeService.getSessionsByTeamName(this.teamName).subscribe(
// //       (data: Session[]) => {
// //         this.sessions = data;
// //         this.initializeSessionClasses();
// //       },
// //       (error: any) => {
// //         console.error('Error fetching sessions', error);
// //       }
// //     );
// //   }

// //   initializeSessionClasses(): void {
// //     this.sessions.forEach((session, index) => {
// //       this.classes[index] = { ...session, complete: session.complete || false };
// //     });
// //   }

// // }

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Session } from 'src/app/Models/Session';
import { AuthService } from 'src/app/auth/auth.service';
import { Team } from 'src/app/Models/Team';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { Time } from '@angular/common';
@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss']
})
export class SubCourseComponent implements OnInit {
  sessions: Session[] = [];
  teamName: string = ''; // This will be populated from local storage
  employeeId: string | null = ''; // To hold the employee ID
  meetingLink: string = '';
  currentIndex: number = 0;
  transformStyle: string = 'translateX(0)';

  constructor(private employeeService: EmployeeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId(); // Get employee ID from local storage

    if (this.employeeId) {
      this.getTeamByEmployeeId(this.employeeId);
    } else {
      console.error('Employee ID is not available in local storage.');
    }
  }

  // Fetch team details using employee ID
  getTeamByEmployeeId(employeeId: string): void {
    this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
      (team: any) => { // Adjust the type if necessary
        this.teamName = team.teamName; // Assume the team name is in the 'teamName' field
        this.meetingLink = team.meetingLink;
        this.getSessionsByTeamName(this.teamName); // Fetch sessions for the retrieved team
      },
      (error) => {
        console.error('Error fetching team details:', error);
      }
    );
  }

  // Fetch sessions by team name
  getSessionsByTeamName(teamName: string): void {
    this.employeeService.getSessionsByTeamName(teamName).subscribe(
      (data: Session[]) => {
        this.sessions = data; // No need to convert here, sessions are already in the correct format
        console.log(this.sessions); // For debugging purposes
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
  }

  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
      this.updateTransform();
    }
  }

  next(): void {
    if (this.currentIndex < this.sessions.length - 0) {
      this.currentIndex += 1;
      if (this.currentIndex >= this.sessions.length) {
        this.currentIndex = this.sessions.length - 0;
      }
      this.updateTransform();
    }
  }

  updateTransform(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 270}px)`; // 230px to account for class-box width and margin
  }

  joinMeeting(link: string): void {
    window.open(link, '_blank');
  }
}

