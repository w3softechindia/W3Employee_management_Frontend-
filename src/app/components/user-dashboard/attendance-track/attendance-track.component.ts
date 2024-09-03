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
//   attendanceList: Attendance[] = []; // List to hold attendance records
//   employeeId: string | null = null;
//   isCheckedIn: boolean = false;
//   currentTime: string = '';
//   showPopup: boolean = false;

//   constructor(
//     private employeeService: EmployeeService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.loadAttendanceStatus();
//     this.loadAttendanceHistory(); // Load attendance history
//     this.updateTime(); // Initialize the time display
//     setInterval(() => this.updateTime(), 1000); // Update time every second

//     // Check local storage for check-in status
//     this.isCheckedIn = localStorage.getItem('isCheckedIn') === 'true';
//   }

//   private getEmployeeId(): string | null {
//     return this.authService.getEmployeeId();
//   }

//   private loadAttendanceStatus(): void {
//     const employeeId = this.getEmployeeId();
//     if (!employeeId) {
//       console.error('No employee ID found.');
//       return;
//     }

//     this.employeeService.getAttendanceStatus(employeeId).subscribe(
//       (response: Attendance) => {
//         this.attendance = response;
//         this.isCheckedIn = this.attendance?.checkStatus ?? false;
//         // Save check-in status to local storage
//         localStorage.setItem('isCheckedIn', this.isCheckedIn.toString());
//       },
//       (error) => {
//         console.error('Failed to load attendance status:', error);
//       }
//     );
//   }

//   private loadAttendanceHistory(): void {
//     const employeeId = this.getEmployeeId();
//     if (!employeeId) {
//       console.error('No employee ID found.');
//       return;
//     }

//     this.employeeService.getAttendanceByEmployeeId(employeeId).subscribe(
//       (response: Attendance[]) => {
//         this.attendanceList = response;
//         console.log('Attendance history loaded:', this.attendanceList);
//       },
//       (error) => {
//         console.error('Failed to load attendance history:', error);
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
//         this.isCheckedIn = true;
//         this.attendance.checkStatus = true; // Set checkStatus to true
//         localStorage.setItem('isCheckedIn', 'true'); // Save check-in status
//         alert('Check-in successful');
//         console.log('Check-in successful:', response);
//         this.loadAttendanceHistory(); // Reload attendance history
//       },
//       (error) => {
//         alert('Check-in failed');
//         console.error('Check-in failed:', error);
//       }
//     );
//   }

//   checkOut(): void {
//     if (this.attendance && this.attendance.id) {
//       this.employeeService.checkOut(this.attendance.id).subscribe(
//         (response: Attendance) => {
//           this.attendance = response;
//           this.isCheckedIn = false;
//           this.attendance.checkStatus = false; // Set checkStatus to false
//           localStorage.removeItem('isCheckedIn'); // Clear check-in status
//           this.showPopup = true; // Show the popup
//           console.log('Check-out successful:', response);
//           this.loadAttendanceHistory(); // Reload attendance history
//         },
//         (error) => {
//           console.error('Check-out failed:', error);
//         }
//       );
//     }
//   }

//   closePopup(): void {
//     this.showPopup = false; // Hide the popup
//   }

//   private updateTime(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString();
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
  attendanceList: Attendance[] = []; // List to hold attendance records
  employeeId: string | null = null;
  isCheckedIn: boolean = false;
  currentTime: string = '';
  showPopup: boolean = false;
  todayAttendance: Attendance[] = []; // Holds today's attendance record

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAttendanceStatus();
    this.loadAttendanceHistory(); // Load attendance history
    this.updateTime(); // Initialize the time display
    setInterval(() => this.updateTime(), 1000); // Update time every second

    // Check local storage for check-in status
    this.isCheckedIn = localStorage.getItem('isCheckedIn') === 'true';
  }

  private getEmployeeId(): string | null {
    return this.authService.getEmployeeId();
  }

  private loadAttendanceStatus(): void {
    const employeeId = this.getEmployeeId();
    if (!employeeId) {
      console.error('No employee ID found.');
      return;
    }

    this.employeeService.getAttendanceStatus(employeeId).subscribe(
      (response: Attendance) => {
        this.attendance = response;
        this.isCheckedIn = this.attendance?.checkStatus ?? false;
        // Save check-in status to local storage
        localStorage.setItem('isCheckedIn', this.isCheckedIn.toString());
      },
      (error) => {
        console.error('Failed to load attendance status:', error);
      }
    );
  }

  private loadAttendanceHistory(): void {
    const employeeId = this.getEmployeeId();
    if (!employeeId) {
      console.error('No employee ID found.');
      return;
    }

    this.employeeService.getAttendanceByEmployeeId(employeeId).subscribe(
      (response: Attendance[]) => {
        this.attendanceList = response;
        console.log('Attendance history loaded:', this.attendanceList);
        this.filterTodayAttendance(); // Filter today's attendance record
      },
      (error) => {
        console.error('Failed to load attendance history:', error);
      }
    );
  }

  private filterTodayAttendance(): void {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    this.todayAttendance = this.attendanceList.filter(
      (record) => record.date === today
    );
    console.log('Today\'s attendance:', this.todayAttendance);
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
        this.attendance.checkStatus = true; // Set checkStatus to true
        localStorage.setItem('isCheckedIn', 'true'); // Save check-in status
        alert('Check-in successful');
        console.log('Check-in successful:', response);
        this.loadAttendanceHistory(); // Reload attendance history
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
          this.attendance.checkStatus = false; // Set checkStatus to false
          localStorage.removeItem('isCheckedIn'); // Clear check-in status
          this.showPopup = true; // Show the popup
          console.log('Check-out successful:', response);
          this.loadAttendanceHistory(); // Reload attendance history
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
