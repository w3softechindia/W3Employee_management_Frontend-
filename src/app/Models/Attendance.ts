export interface Attendance {
  id: number;
  date: string; // Assuming date is returned as a string
  checkIn: string; // Assuming checkIn time is returned as a string
  checkOut: string; // Assuming checkOut time is returned as a string
  attendanceStatus: string;
  workingHours: number;
}
