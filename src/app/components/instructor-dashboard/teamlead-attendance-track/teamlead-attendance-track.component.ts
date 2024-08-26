import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Attendance } from 'src/app/Models/Attendance';

@Component({
  selector: 'app-teamlead-attendance-track',
  templateUrl: './teamlead-attendance-track.component.html',
  styleUrls: ['./teamlead-attendance-track.component.scss']
})
export class TeamleadAttendanceTrackComponent implements OnInit {
  attendance: Attendance | null = null;
  employeeId: string | null = null;
  isCheckedIn: boolean = false;
  currentTime: string = '';
  showPopup: boolean = false;

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

    this.employeeService.getAttendanceByEmployeeId(employeeId).subscribe(
      (response: Attendance) => {
        this.attendance = response;
        this.isCheckedIn = !!this.attendance?.checkIn && !this.attendance?.checkOut;
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
    if (this.attendance && this.attendance.id) {
      this.employeeService.checkOut(this.attendance.id).subscribe(
        (response: Attendance) => {
          this.attendance = response;
          this.isCheckedIn = false;
          this.showPopup = true; // Show the popup
          console.log('Check-out successful:', response);
        },
        (error) => {
          console.error('Check-out failed:', error);
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false; // Hide the popup
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
