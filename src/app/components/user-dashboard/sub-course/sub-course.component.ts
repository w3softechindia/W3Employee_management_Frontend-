import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Session } from 'src/app/Models/Session';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss'],
})
export class SubCourseComponent implements OnInit {
  sessions: Session[] = [];
  teamName: string = '';
  employeeId: string | null = '';
  meetingLink: string = '';
  currentIndex: number = 0;
  transformStyle: string = 'translateX(0)';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId();
    if (this.employeeId) {
      this.getTeamByEmployeeId(this.employeeId);
    } else {
      console.error('Employee ID is not available in local storage.');
    }
  }

  getTeamByEmployeeId(employeeId: string): void {
    this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
      (team: any) => {
        this.teamName = team.teamName;
        this.meetingLink = team.meetingLink;
        this.getSessionsByTeamName(this.teamName);
      },
      (error) => {
        console.error('Error fetching team details:', error);
      }
    );
  }

  getSessionsByTeamName(teamName: string): void {
    this.employeeService.getSessionsByTeamName(teamName).subscribe(
      (data: Session[]) => {
        this.sessions = data;
        console.log(this.sessions);
      },
      (error) => {
        console.error('Error fetching sessions:', error);
      }
    );
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

  // isJoinButtonEnabled(session: Session): boolean {
  //   const now = new Date();
  //   const startTime = this.convertTimeStringToDate(session.startTime);
  //   const endTime = this.convertTimeStringToDate(session.endTime);
  //   return now >= startTime && now <= endTime;
  // }
  isJoinButtonEnabled(session: Session): boolean {
    const now = new Date();

    // Convert session date to a Date object
    const sessionDate = new Date(session.classDate);

    // Ensure the date matches
    const isSameDate =
      now.getFullYear() === sessionDate.getFullYear() &&
      now.getMonth() === sessionDate.getMonth() &&
      now.getDate() === sessionDate.getDate();

    // Convert start and end times to Date objects
    const startTime = this.convertTimeStringToDate(session.startTime);
    const endTime = this.convertTimeStringToDate(session.endTime);

    // Return true if the current date and time are within the session's date and time range
    return isSameDate && now >= startTime && now <= endTime;
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateTransform();
    }
  }

  next(): void {
    if (this.currentIndex < this.sessions.length - 0) {
      this.currentIndex += 1;
      this.updateTransform();
    }
  }

  updateTransform(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 270}px)`;
  }

  joinMeeting(link: string): void {
    window.open(link, '_blank');
  }
}
