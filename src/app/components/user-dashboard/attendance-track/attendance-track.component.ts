// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from 'src/app/employee.service';
// import { Attendance } from 'src/app/Models/Attendance';

// @Component({
//   selector: 'app-attendance-track',
//   templateUrl: './attendance-track.component.html',
//   styleUrls: ['./attendance-track.component.scss'],
// })
// export class AttendanceTrackComponent implements OnInit {
//   attendance: Attendance | null = null;
//   employeeId: string | null = null;
//   isCheckedIn: boolean = false; // Flag to manage button visibility

//   constructor(
//     private employeeService: EmployeeService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.loadAttendance(); 
//   }

//   private getEmployeeId(): string | null {
//     return this.authService.getEmployeeId();
//   }

//   private loadAttendance(): void {
//     const employeeId = this.getEmployeeId();
//     if (!employeeId) {
//       console.error('No employee ID found.');
//       return;
//     }

//     this.employeeService.saveAttendance(employeeId).subscribe(
//       (response: Attendance) => {
//         this.attendance = response;
//         this.isCheckedIn = !!this.attendance?.checkIn; // Update flag based on check-in status
//       },
//       (error) => {
//         console.error('Failed to load attendance:', error);
//       }
//     );
//   }

//   checkIn(): void {
//     const employeeId = this.getEmployeeId();
//     if (!employeeId) {
//       console.error('No employee ID found.');
//       return;
//     }

//     this.employeeService.saveAttendance(employeeId).subscribe(
//       (response: Attendance) => {
//         this.attendance = response;
//         this.isCheckedIn = true; // Update flag to show Check-Out button
//         alert('Check-in successful'); 
//         console.log('Check-in successful:', response);
//       },
//       (error) => {
//         alert('Check-in failed');
//         console.error('Check-in failed:', error);
//       }
//     );
//   }

//   checkOut(): void {
//     this.employeeService.updateAttendanceStatus().subscribe(
//       (response) => {
//         if (this.attendance) {
//           this.attendance.attendanceStatus = 'Updated';
//           this.isCheckedIn = false; // Update flag to show Check-In button
//         }
//         console.log('Check-out successful:', response);
//         alert('Check-out successful');
//       },
//       (error) => {
//         console.error('Check-out failed:', error);
//       }
//     );
//   }
// }

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
  isCheckedIn: boolean = false; // Flag to manage button visibility

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAttendance(); 
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
        this.isCheckedIn = !!this.attendance?.checkOut && !this.attendance?.checkIn; // Update flag based on check-in status and if not checked out
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
        this.isCheckedIn = true; // Update flag to show Check-Out button
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
          this.isCheckedIn = false; // Update flag to show Check-In button
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
