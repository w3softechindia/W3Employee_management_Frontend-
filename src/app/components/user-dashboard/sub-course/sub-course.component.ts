import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Session } from 'src/app/Models/Session';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/Models/Team';
import { SubCourse } from 'src/app/Models/SubCourse';

@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss'],
})
export class SubCourseComponent implements OnInit {
  value: number = 0;
  sessions: Session[];
  subCourses: SubCourse[] = []; // Array to store sub-courses
  teamName: string = '';
  employeeId: string | null = '';
  subCourseName: string = '';
  meetingLink: string = '';
  currentIndex: number = 0;
  transformStyle: string = 'translateX(0)';
  attendancePercentage: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId();
    this.subCourseName = this.route.snapshot.params['subCourseName'];

    console.log('Employee ID:', this.employeeId);
    console.log('Sub-Course Name:', this.subCourseName);

    if (this.employeeId && this.subCourseName) {
      this.getTeamByEmployeeId(this.employeeId);
      this.calculateAttendancePercentage(this.employeeId);
    } else {
      console.error('Employee ID or Sub-Course Name is not available.');
    }
  }

  getTeamByEmployeeId(employeeId: string): void {
    this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
      (team: Team) => {
        this.teamName = team.teamName;
        this.meetingLink = team.meetingLink;
        console.log('Team Name:', this.teamName);
        console.log('Meeting Link:', this.meetingLink);
        this.getSubCoursesByTeam(this.teamName); // Fetch sub-courses based on teamName
        this.getSessionsBySubCourse(); // Fetch sessions based on teamName and subCourseName
      },
      (error) => {
        console.error('Error fetching team details:', error);
      }
    );
  }

  // Fetch sub-courses by team
  getSubCoursesByTeam(teamName: string): void {
    console.log('Fetching sub-courses for Team Name:', teamName);
    this.employeeService.getSubCoursesByTeam(teamName).subscribe(
      (data: SubCourse[]) => {
        this.subCourses = data;
        console.log('Fetched Sub-Courses:', this.subCourses); // Log fetched sub-courses
      },
      (error) => {
        console.error('Error fetching sub-courses:', error);
      }
    );
  }

  // Fetch sessions by sub-course
  getSessionsBySubCourse() {
    console.log('Fetching sessions with Team Name:', this.teamName, 'and Sub-Course Name:', this.subCourseName);
    if (this.teamName && this.subCourseName) {
      this.employeeService.getSessionsBySubCourse(this.teamName, this.subCourseName).subscribe(
        (data: any) => {
          this.sessions = data;
          console.log('Fetched Sessions:', this.sessions);
        },
        (error) => {
          console.error('Error fetching sessions:', error);
        }
      );
    } else {
      console.error('Team name or sub-course name is not defined.');
    }
  }

  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      seconds
    );
  }

  isJoinButtonEnabled(session: Session): boolean {
    const now = new Date();
    const startTime = this.convertTimeStringToDate(session.startTime);
    const endTime = this.convertTimeStringToDate(session.endTime);

    return now >= startTime && now <= endTime;
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateTransform();
    }
  }

  next(): void {
    if (this.currentIndex < this.sessions.length - 1) {
      this.currentIndex += 1;
      this.updateTransform();
    }
  }

  updateTransform(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 270}px)`;
  }

  joinMeeting(link: string, sessionId: number): void {
    const employeeId = this.employeeId;

    if (employeeId) {
      this.employeeService
        .markSessionAsAttended(sessionId, employeeId)
        .subscribe(() => {
          window.open(link, '_blank');
          this.loadProgress(); // Refresh progress after marking session as attended
        });
    } else {
      console.error('Employee ID is null. Cannot mark session as attended.');
    }
  }

  loadProgress(): void {
    const employeeId = this.employeeId;

    if (employeeId) {
      this.employeeService
        .getTotalSessions(employeeId)
        .subscribe((totalSessions) => {
          this.employeeService
            .getAttendedSessions(employeeId)
            .subscribe((attendedSessions) => {
              if (totalSessions > 0) {
                this.value = (attendedSessions / totalSessions) * 100;
              } else {
                this.value = 0;
              }
            });
        });
    }
  }

  markSessionAsAttended(sessionId: number, employeeId: string): void {
    this.employeeService.markSessionAsAttended(sessionId, employeeId).subscribe(
      () => {
        console.log(`Session ${sessionId} marked as attended.`);
        this.calculateAttendancePercentage(employeeId); // Update attendance percentage
      },
      (error) => {
        console.error('Error marking session as attended:', error);
      }
    );
  }

  calculateAttendancePercentage(employeeId: string): void {
    this.employeeService
      .getTotalSessions(employeeId)
      .subscribe((totalSessions) => {
        this.employeeService
          .getAttendedSessions(employeeId)
          .subscribe((attendedSessions) => {
            this.employeeService
              .countCompletedTasksByEmployeeId(employeeId)
              .subscribe((completedTasks) => {
                const totalCount = totalSessions + completedTasks;
                const attendedCount = attendedSessions + completedTasks;
                this.attendancePercentage =
                  totalCount > 0 ? (attendedCount / totalCount) * 100 : 0;
              });
          });
      });
  }
}
