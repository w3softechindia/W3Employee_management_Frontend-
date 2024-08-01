export interface SessionsDTO {
  classId: number;
  classDuration: number;
  classDate: string;
  classStatus: string;
  startTime: string;
  endTime: string;
  sessionNumber: number;
  meetingLink?: string;
  timeStatus?: string;
}
