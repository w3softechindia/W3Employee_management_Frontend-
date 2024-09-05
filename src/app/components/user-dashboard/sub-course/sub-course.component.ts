import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Session } from 'src/app/Models/Session';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss']
})
export class SubCourseComponent implements OnInit {
  value: number = 0;
  sessions: Session[] = [];
  teamName: string = '';
  employeeId: string | null = '';
  subCourseName: string = ''; // To store the subCourseName from the route
  meetingLink: string = '';
  currentIndex: number = 0;
  transformStyle: string = 'translateX(0)';
  attendancePercentage: number = 0;

  constructor(
    private employeeService: EmployeeService, 
    private authService: AuthService,
    private route: ActivatedRoute // To get route parameters
  ) {}

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId(); // Retrieve employee ID from AuthService
    this.subCourseName = this.route.snapshot.paramMap.get('subCourseName') || ''; // Get subCourseName from route

    if (this.employeeId) {
      this.getTeamByEmployeeId(this.employeeId); // Fetch team details based on employee ID
      this.calculateAttendancePercentage(this.employeeId); // Calculate the attendance percentage
    } else {
      console.error('Employee ID is not available.');
    }
  }

  getTeamByEmployeeId(employeeId: string): void {
    this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
      (team: any) => {
        this.teamName = team.teamName;
        this.meetingLink = team.meetingLink;
        this.getSessionsBySubCourse(this.teamName, this.subCourseName); // Fetch sessions based on teamName and subCourseName
      },
      (error) => {
        console.error('Error fetching team details:', error);
      }
    );
  }

  getSessionsBySubCourse(teamName: string, subCourseName: string): void {
    this.employeeService.getSessionsBySubCourse(teamName, subCourseName).subscribe(
      (data: Session[]) => {
        this.sessions = data;
        console.log('Sessions fetched successfully:', this.sessions);
      },
      (error) => {
        console.error('Error fetching sessions:', error);
        // Display an appropriate message to the user
      }
    );
  }
  

  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds);
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
      this.employeeService.markSessionAsAttended(sessionId, employeeId).subscribe(() => {
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
      this.employeeService.getTotalSessions(employeeId).subscribe(totalSessions => {
        this.employeeService.getAttendedSessions(employeeId).subscribe(attendedSessions => {
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
    this.employeeService.getTotalSessions(employeeId).subscribe(totalSessions => {
      this.employeeService.getAttendedSessions(employeeId).subscribe(attendedSessions => {
        this.employeeService.countCompletedTasksByEmployeeId(employeeId).subscribe(completedTasks => {
          const totalCount = totalSessions + completedTasks;
          const attendedCount = attendedSessions + completedTasks;
          this.attendancePercentage = totalCount > 0 ? (attendedCount / totalCount) * 100 : 0;
        });
      });
    });
  }
}
