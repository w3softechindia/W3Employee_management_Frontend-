import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Attendance } from 'src/app/Models/Attendance';

@Component({
  selector: 'app-attendance-track',
  templateUrl: './attendance-track.component.html',
  styleUrls: ['./attendance-track.component.scss'],
})
export class AttendanceTrackComponent {
  attendance: Attendance | null = null;
  employeeId: string | null = null;
  status: string = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  private getEmployeeId(): string | null {
    return this.authService.getEmployeeId();
  }

  checkIn() {
    const employeeId = this.getEmployeeId();
    if (!employeeId) {
      console.error('No employee ID found.');
      return;
    }

    this.employeeService.saveAttendance(employeeId).subscribe(
      (response: Attendance) => {
        this.employeeId = employeeId;
        this.status = 'Checked In';
        alert('Check-in successful'); 
        console.log('Check-in successful:', response);
      },
      (error) => {
        alert('Check-in failed');
        console.error('Check-in failed:', error);
      }
    );
  }

  checkOut() {
    this.employeeService.updateAttendanceStatus().subscribe(
      (response) => {
        if (this.attendance) {
          this.attendance.attendanceStatus = 'Updated';
        }
        console.log('Check-out successful:', response);
        alert('Check-out successful');
      },
      (error) => {
        console.error('Check-out failed:', error);
      }
    );
  }
}
