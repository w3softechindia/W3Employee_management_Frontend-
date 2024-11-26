// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from 'src/app/employee.service';
// import { Attendance } from 'src/app/Models/Attendance';

// @Component({
//   selector: 'app-teamlead-attendance-track',
//   templateUrl: './teamlead-attendance-track.component.html',
//   styleUrls: ['./teamlead-attendance-track.component.scss']
// })
// export class TeamleadAttendanceTrackComponent implements OnInit {
//   attendance: Attendance | null = null;
//   attendanceList: Attendance[] = []; // List to hold attendance records
//   employeeId: string | null = null;
//   isCheckedIn: boolean = false;
//   currentTime: string = '';
//   showPopup: boolean = false;
//   todayAttendance: Attendance[] = []; // Holds today's attendance record

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
//         this.filterTodayAttendance(); // Filter today's attendance record
//       },
//       (error) => {
//         console.error('Failed to load attendance history:', error);
//       }
//     );
//   }

//   private filterTodayAttendance(): void {
//     const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
//     this.todayAttendance = this.attendanceList.filter(
//       (record) => record.date === today
//     );
//     console.log('Today\'s attendance:', this.todayAttendance);
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
  selector: 'app-teamlead-attendance-track',
  templateUrl: './teamlead-attendance-track.component.html',
  styleUrls: ['./teamlead-attendance-track.component.scss']
})
export class TeamleadAttendanceTrackComponent implements OnInit {
  attendance: Attendance | null = null;
  attendanceList: Attendance[] = []; // List to hold attendance records
  employeeId: string | null = null;
  isCheckedIn: boolean = false;
  currentTime: string = '';
  showPopup: boolean = false;
  todayAttendance: Attendance[] = []; // Holds today's attendance record
  isTimeValid: boolean = false; // Track if the current time is within the 9:00 PM to 6:00 PM range
  isCheckInOutCompleted: boolean = false; // Track if both check-in and check-out have been completed today

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

    // Check if current time is within the valid time range
    this.checkTimeValidity();

    // Check if check-in and check-out were already completed for the day
    this.checkIfCheckInOutCompleted();
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
    console.log("Today's attendance:", this.todayAttendance);
  }

  // Check if current time is between 9:00 PM and 6:00 PM
  private checkTimeValidity(): void {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Time window from 9:00 AM (9:00) to 6:00 PM (18:00)
    if ((hours === 9 && minutes >= 0) || (hours > 9 && hours < 18)) {
      this.isTimeValid = true;
    } else {
      this.isTimeValid = false;
    }

    // This is ok code
    // // Time window from 9:00 AM (9:00) to 6:00 PM (18:00)
    // if (hours >= 9 && hours < 18) {
    //   this.isTimeValid = true;
    // } else {
    //   this.isTimeValid = false;
    // }
  }

  // Check if check-in and check-out were already completed today
  private checkIfCheckInOutCompleted(): void {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    if (
      this.attendanceList.some(
        (record) =>
          record.date === today && record.attendanceStatus === 'Checked-out'
      )
    ) {
      this.isCheckInOutCompleted = true; // Mark as completed if there is a check-out today
    }
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

          // Mark as completed
          this.isCheckInOutCompleted = true;
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
    this.checkTimeValidity(); // Check the time validity every second
  }
}