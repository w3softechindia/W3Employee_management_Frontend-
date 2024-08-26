export interface Attendance {
  id: number;
  date: string; // Date as a string
  checkIn: string; // Time as a string
  checkOut: string; // Time as a string
  attendanceStatus: string;
  workingHours: number;
  checkStatus: boolean;
}
