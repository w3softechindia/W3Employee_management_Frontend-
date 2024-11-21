// import { Component, OnInit, ViewChild } from '@angular/core';
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
//   attendanceList: Attendance[] = []; // List to hold attendance records
//   employeeId: string | null = null;
//   isCheckedIn: boolean = false;
//   currentTime: string = '';
//   showPopup: boolean = false;
//   todayAttendance: Attendance[] = []; // Holds today's attendance record

//   constructor(
//     private employeeService: EmployeeService,
//     private authService: AuthService,
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

//   // checkIn(): void {
//   //   const employeeId = this.getEmployeeId();
//   //   if (!employeeId) {
//   //     console.error('No employee ID found.');
//   //     return;
//   //   }

//   //   this.employeeService.saveAttendance(employeeId).subscribe(
//   //     (response: Attendance) => {
//   //       this.attendance = response;
//   //       this.isCheckedIn = true;
//   //       this.attendance.checkStatus = true; // Set checkStatus to true
//   //       localStorage.setItem('isCheckedIn', 'true'); // Save check-in status
//   //       alert('Check-in successful');
//   //       console.log('Check-in successful:', response);
//   //       this.loadAttendanceHistory(); // Reload attendance history
//   //     },
//   //     (error) => {
//   //       alert('Check-in failed');
//   //       console.error('Check-in failed:', error);
//   //     }
//   //   );
//   // }



//   closePopup(): void {
//     this.showPopup = false; // Hide the popup
//   }

//   private updateTime(): void {
//     const now = new Date();
//     this.currentTime = now.toLocaleTimeString();
//   }
 





//   isModalOpen: boolean = false; // Controls modal visibility
//   openModal(): void {
//     this.isModalOpen = true;
//   }

//   closeModal(): void {
//     this.isModalOpen = false;
//   }


//   hasCheckedOut = false; // Tracks if the user has checked out for the day

//    // Function to determine if the current time is within 9 AM - 5 PM and Monday-Friday
//    canCheckIn(): boolean {
//     const now = new Date();
//     const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
//     const hour = now.getHours(); // Current hour (0-23)

//     // Check if day is Monday-Friday (1-5) and time is between 9 AM and 6 PM
//     return day >= 1 && day <= 5 && hour >= 9 && hour < 18 && !this.isCheckedIn;
//   }

//   // Function to check if the checkout button should be enabled
//   canCheckOut(): boolean {
//     return this.isCheckedIn && !this.hasCheckedOut;
//   }


  
//   checkIn(): void {

//     if (this.canCheckIn()) {
//       this.isCheckedIn = true;
//       this.isModalOpen = true; // Show success modal
//       this.attendanceList.push({
//         date: new Date().toLocaleDateString(),
//         checkIn: new Date().toLocaleTimeString(),
//         checkOut: null,
//         attendanceStatus: 'Checked In',
//         id: 0,
//         workingHours: 0,
//         checkStatus: false
//       });
//     }


//     const employeeId = this.getEmployeeId();
//     if (!employeeId) {
//       console.error('No employee ID found.');
//       return;
//     }

//     this.employeeService.saveAttendance(employeeId).subscribe(
//       (response: Attendance) => {
//         this.attendance = response;
//         this.isCheckedIn = true;
//         this.attendance.checkStatus = true;
//         localStorage.setItem('isCheckedIn', 'true');
//         console.log('Check-in successful:', response);
//         this.loadAttendanceHistory(); // Reload attendance history
//         this.openModal(); // Open the success modal
//       },
//       (error) => {
//         console.error('Check-in failed:', error);
//         // Optionally, open an error modal
//       }
//     );


//   }

//   checkOut(): void {

//     if (this.canCheckOut()) {
//       this.hasCheckedOut = true;
//       const todayRecord = this.attendanceList.find(
//         record => record.date === new Date().toLocaleDateString()
//       );
//       if (todayRecord) {
//         todayRecord.checkOut = new Date().toLocaleTimeString();
//         todayRecord.attendanceStatus = 'Checked Out';
//       }
//     }
    
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

// }






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
//   todayDate: string = new Date().toLocaleDateString(); // Save today's date

//   constructor(
//     private employeeService: EmployeeService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.loadAttendanceStatus();
//     this.loadAttendanceHistory();
//     this.updateTime();
//     setInterval(() => this.updateTime(), 1000);
//     this.restoreAttendanceState();
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

//         // Sync the server state with the local state
//         this.isCheckedIn = isToday && this.attendance?.checkStatus;
//         this.hasCheckedOut = isToday && !!this.attendance?.checkOut;

//         // Save the state in local storage for persistence
//         this.saveAttendanceState();
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
//       // Clear state if the saved date is not today
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

//     // Check if it's Monday-Friday and within allowed hours, and the user has not already checked in
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
//       const employeeId = this.getEmployeeId();
//       if (!employeeId) {
//         console.error('No employee ID found.');
//         return;
//       }

//       this.employeeService.saveAttendance(employeeId).subscribe(
//         (response: Attendance) => {
//           this.attendance = response;
//           this.isCheckedIn = true;

//           // Save state to local storage
//           this.saveAttendanceState();

//           alert('Check-in successful');
//           this.loadAttendanceHistory();
//           this.isModalOpen = true; // Open success modal
//         },
//         (error) => {
//           console.error('Check-in failed:', error);
//         }
//       );
//     }
//   }

//   checkOut(): void {
//     if (this.canCheckOut() && this.attendance?.id) {
//       this.employeeService.checkOut(this.attendance.id).subscribe(
//         (response: Attendance) => {
//           this.attendance = response;
//           this.isCheckedIn = false;
//           this.hasCheckedOut = true;

//           // Update state in local storage
//           this.saveAttendanceState();

//           alert('Check-out successful');
//           this.loadAttendanceHistory();
//         },
//         (error) => {
//           console.error('Check-out failed:', error);
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

//       closePopup(): void {
//     this.showPopup = false; // Hide the popup
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
  attendanceList: Attendance[] = [];
  isCheckedIn: boolean = false;
  hasCheckedOut: boolean = false;
  currentTime: string = '';
  isModalOpen: boolean = false;
  todayAttendance: Attendance[] = [];
  showPopup: boolean = false;
  todayDate: string = new Date().toLocaleDateString();
  isProcessing: boolean = false; // New flag to handle button disabling

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.restoreAttendanceState();
    this.loadAttendanceStatus();
    this.loadAttendanceHistory();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
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
        const isToday = this.attendance?.date === this.todayDate;

        this.isCheckedIn = isToday && this.attendance?.checkStatus;
        this.hasCheckedOut = isToday && !!this.attendance?.checkOut;

        this.saveAttendanceState(); // Persist the state
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
        this.filterTodayAttendance();
      },
      (error) => {
        console.error('Failed to load attendance history:', error);
      }
    );
  }

  private filterTodayAttendance(): void {
    this.todayAttendance = this.attendanceList.filter(
      (record) => record.date === this.todayDate
    );
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  private restoreAttendanceState(): void {
    const savedDate = localStorage.getItem('attendanceDate');
    if (savedDate === this.todayDate) {
      this.isCheckedIn = localStorage.getItem('isCheckedIn') === 'true';
      this.hasCheckedOut = localStorage.getItem('hasCheckedOut') === 'true';
    } else {
      this.clearAttendanceState();
    }
  }

  private saveAttendanceState(): void {
    localStorage.setItem('attendanceDate', this.todayDate);
    localStorage.setItem('isCheckedIn', this.isCheckedIn.toString());
    localStorage.setItem('hasCheckedOut', this.hasCheckedOut.toString());
  }

  private clearAttendanceState(): void {
    localStorage.removeItem('attendanceDate');
    localStorage.removeItem('isCheckedIn');
    localStorage.removeItem('hasCheckedOut');
    this.isCheckedIn = false;
    this.hasCheckedOut = false;
  }

  canCheckIn(): boolean {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours(); // Current hour (0-23)

    return (
      day >= 1 &&
      day <= 5 &&
      hour >= 9 &&
      hour < 18 &&
      !this.isCheckedIn &&
      !this.hasCheckedOut
    );
  }

  canCheckOut(): boolean {
    return this.isCheckedIn && !this.hasCheckedOut;
  }

  checkIn(): void {
    if (this.canCheckIn()) {
      this.isProcessing = true; // Set flag to true to disable button
      const employeeId = this.getEmployeeId();
      if (!employeeId) {
        console.error('No employee ID found.');
        this.isProcessing = false; // Reset flag in case of error
        return;
      }

      this.employeeService.saveAttendance(employeeId).subscribe(
        (response: Attendance) => {
          this.attendance = response;
          this.isCheckedIn = true;
          this.isProcessing = false; // Reset flag on success

          this.saveAttendanceState();

          // alert('Check-in successful');
          this.loadAttendanceHistory();
          this.isModalOpen = true;
        },
        (error) => {
          console.error('Check-in failed:', error);
          this.isProcessing = false; // Reset flag on success
        }
      );
    }
  }

  checkOut(): void {
    if (this.canCheckOut() && this.attendance?.id) {
      this.isProcessing = true; // Set flag to true to disable button
      this.employeeService.checkOut(this.attendance.id).subscribe(
        (response: Attendance) => {
          this.attendance = response;
          this.isCheckedIn = false;
          this.hasCheckedOut = true;
          this.isProcessing = false; // Reset flag on success

          this.saveAttendanceState();

          // alert('Check-out successful');
          this.loadAttendanceHistory();
          this.showPopup = true; // Show the popup
        },
        (error) => {
          console.error('Check-out failed:', error);
          this.isProcessing = false; // Reset flag on failure
        }
      );
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  closePopup(): void {
    this.showPopup = false;
  }


}
