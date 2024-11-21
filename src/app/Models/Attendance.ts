export interface Attendance {
  id: number;
  date: string; // Date as a string
  checkIn: string; // Time as a string
  // checkOut: string; // Time as a string
  checkOut: string | null; // Check-out time, can be null
  attendanceStatus: string;
  workingHours: number;
  checkStatus: boolean;
}
