
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from 'src/app/employee.service';
// import { Attendance } from 'src/app/Models/Attendance';

// @Component({
//   selector: 'app-bdm-attendance',
//   templateUrl: './bdm-attendance.component.html',
//   styleUrls: ['./bdm-attendance.component.scss']
// })
// export class BdmAttendanceComponent implements OnInit {
//   attendance: Attendance | null = null;
//   attendanceList: Attendance[] = [];
//   isCheckedIn: boolean = false;
//   hasCheckedOut: boolean = false;
//   currentTime: string = '';
//   isModalOpen: boolean = false;
//   todayAttendance: Attendance[] = [];
//   showPopup: boolean = false;
//   todayDate: string = new Date().toLocaleDateString();
//   isProcessing: boolean = false; // New flag to handle button disabling

//   constructor(
//     private employeeService: EmployeeService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.restoreAttendanceState();
//     this.loadAttendanceStatus();
//     this.loadAttendanceHistory();
//     this.updateTime();
//     setInterval(() => this.updateTime(), 1000);
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
//         const isToday = this.attendance?.date === this.todayDate;

//         this.isCheckedIn = isToday && this.attendance?.checkStatus;
//         this.hasCheckedOut = isToday && !!this.attendance?.checkOut;

//         this.saveAttendanceState(); // Persist the state
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
//         this.filterTodayAttendance();
//       },
//       (error) => {
//         console.error('Failed to load attendance history:', error);
//       }
//     );
//   }

//   private filterTodayAttendance(): void {
//     this.todayAttendance = this.attendanceList.filter(
//       (record) => record.date === this.todayDate
//     );
//   }

//   private updateTime(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString();
//   }

//   private restoreAttendanceState(): void {
//     const savedDate = localStorage.getItem('attendanceDate');
//     if (savedDate === this.todayDate) {
//       this.isCheckedIn = localStorage.getItem('isCheckedIn') === 'true';
//       this.hasCheckedOut = localStorage.getItem('hasCheckedOut') === 'true';
//     } else {
//       this.clearAttendanceState();
//     }
//   }

//   private saveAttendanceState(): void {
//     localStorage.setItem('attendanceDate', this.todayDate);
//     localStorage.setItem('isCheckedIn', this.isCheckedIn.toString());
//     localStorage.setItem('hasCheckedOut', this.hasCheckedOut.toString());
//   }

//   private clearAttendanceState(): void {
//     localStorage.removeItem('attendanceDate');
//     localStorage.removeItem('isCheckedIn');
//     localStorage.removeItem('hasCheckedOut');
//     this.isCheckedIn = false;
//     this.hasCheckedOut = false;
//   }

//   canCheckIn(): boolean {
//     const now = new Date();
//     const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
//     const hour = now.getHours(); // Current hour (0-23)

//     return (
//       day >= 1 &&
//       day <= 5 &&
//       hour >= 9 &&
//       hour < 18 &&
//       !this.isCheckedIn &&
//       !this.hasCheckedOut
//     );
//   }

//   canCheckOut(): boolean {
//     return this.isCheckedIn && !this.hasCheckedOut;
//   }

//   checkIn(): void {
//     if (this.canCheckIn()) {
//       this.isProcessing = true; // Set flag to true to disable button
//       const employeeId = this.getEmployeeId();
//       if (!employeeId) {
//         console.error('No employee ID found.');
//         this.isProcessing = false; // Reset flag in case of error
//         return;
//       }

//       this.employeeService.saveAttendance(employeeId).subscribe(
//         (response: Attendance) => {
//           this.attendance = response;
//           this.isCheckedIn = true;
//           this.isProcessing = false; // Reset flag on success

//           this.saveAttendanceState();

//           // alert('Check-in successful');
//           this.loadAttendanceHistory();
//           this.isModalOpen = true;
//         },
//         (error) => {
//           console.error('Check-in failed:', error);
//           this.isProcessing = false; // Reset flag on success
//         }
//       );
//     }
//   }

//   checkOut(): void {
//     if (this.canCheckOut() && this.attendance?.id) {
//       this.isProcessing = true; // Set flag to true to disable button
//       this.employeeService.checkOut(this.attendance.id).subscribe(
//         (response: Attendance) => {
//           this.attendance = response;
//           this.isCheckedIn = false;
//           this.hasCheckedOut = true;
//           this.isProcessing = false; // Reset flag on success

//           this.saveAttendanceState();

//           // alert('Check-out successful');
//           this.loadAttendanceHistory();
//           this.showPopup = true; // Show the popup
//         },
//         (error) => {
//           console.error('Check-out failed:', error);
//           this.isProcessing = false; // Reset flag on failure
//         }
//       );
//     }
//   }

//   openModal(): void {
//     this.isModalOpen = true;
//   }

//   closeModal(): void {
//     this.isModalOpen = false;
//   }

//   closePopup(): void {
//     this.showPopup = false;
//   }


// }




import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Attendance } from 'src/app/Models/Attendance';

@Component({
  selector: 'app-bdm-attendance',
  templateUrl: './bdm-attendance.component.html',
  styleUrls: ['./bdm-attendance.component.scss']
})
export class BdmAttendanceComponent implements OnInit {
  attendance: Attendance | null = null;
  attendanceList: Attendance[] = []; // List to hold attendance records
  employeeId: string | null = null;
  isCheckedIn: boolean = false;
  currentTime: string = '';
  showPopup: boolean = false;
  todayAttendance: Attendance[] = []; // Holds today's attendance record
  isTimeValid: boolean = false; // Track if the current time is within the 9:00 PM to 6:00 PM range
  isCheckInOutCompleted: boolean = false; // Track if both check-in and check-out have been completed today
  isModalOpen: boolean = false;
  isModalOpen_2: boolean = false;


  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) { }

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
    // const now = new Date();
    // const hours = now.getHours();
    // const minutes = now.getMinutes();

    const nowIST = this.getIndianTime(new Date()); // Get current time in IST
    const hours = nowIST.getHours();
    const minutes = nowIST.getMinutes();

    // Time window from 9:00 AM (9:00) to 6:00 PM (18:00)
    if ((hours === 9 && minutes >= 0) || (hours > 9 && hours < 18)) {
      this.isTimeValid = true;
    } else {
      this.isTimeValid = false;
    }
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

  // Format the time to "hh:mm:ss AM/PM"
  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
  }

  checkIn(): void {
    const employeeId = this.getEmployeeId();
    if (!employeeId) {
      console.error('No employee ID found.');
      return;
    }

    const now = this.getIndianTime(new Date());
    const formattedTime = this.formatTime(now); // Format the current time as hh:mm:ss AM/PM

    this.employeeService.saveAttendance(employeeId).subscribe(
      (response: Attendance) => {
        this.attendance = response;
        this.isCheckedIn = true;
        this.attendance.checkStatus = true; // Set checkStatus to true
        localStorage.setItem('isCheckedIn', 'true'); // Save check-in status
        // alert('Check-in successful');
        // console.log('Check-in successful:', response);
        this.loadAttendanceHistory(); // Reload attendance history
        this.isModalOpen = true;
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
          this.isModalOpen_2 = true;
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



  private getIndianTime(date: Date): Date {
    // Convert the given date to IST (UTC + 5:30)
    const utcOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const utcDate = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // Adjust for UTC
    return new Date(utcDate + utcOffset);
  }





  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  closeModal_2(): void {
    this.isModalOpen_2 = false;
  }




}