import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Attendance } from 'src/app/Models/Attendance';

@Component({
  selector: 'app-attendance-track',
  templateUrl: './attendance-track.component.html',
  styleUrls: ['./attendance-track.component.scss'],
})
export class AttendanceTrackComponent implements OnInit {
  attendance: Attendance | null = null;
  employeeId: string | null = null;
  isCheckedIn: boolean = false;
  currentTime: string = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
    this.updateTime(); // Initialize the time display
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  private getEmployeeId(): string | null {
    return this.authService.getEmployeeId();
  }

  private loadAttendance(): void {
    const employeeId = this.getEmployeeId();
    if (!employeeId) {
      console.error('No employee ID found.');
      return;
    }

    this.employeeService.saveAttendance(employeeId).subscribe(
      (response: Attendance) => {
        this.attendance = response;
        this.isCheckedIn = !!this.attendance?.checkOut && !this.attendance?.checkIn;
      },
      (error) => {
        console.error('Failed to load attendance:', error);
      }
    );
  }

  checkIn(): void {
    const employeeId = this.getEmployeeId();
    if (!employeeId) {
      console.error('No employee ID found.');
      return;
    }

    this.employeeService.saveAttendance(employeeId).subscribe(
      (response: Attendance) => {
        this.attendance = response;
        this.isCheckedIn = true;
        alert('Check-in successful'); 
        console.log('Check-in successful:', response);
      },
      (error) => {
        alert('Check-in failed');
        console.error('Check-in failed:', error);
      }
    );
  }

  checkOut(): void {
    this.employeeService.updateAttendanceStatus().subscribe(
      (response) => {
        if (this.attendance) {
          this.attendance.attendanceStatus = 'Updated';
          this.isCheckedIn = false;
        }
        console.log('Check-out successful:', response);
        alert('Check-out successful');
      },
      (error) => {
        console.error('Check-out failed:', error);
      }
    );
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
