export interface Rms_Interview {
  interviewId?: number;  // Optional because it will be generated by the backend
  employeeName: string;
  employeeEmail: string;
  reference: string;
  interviewDateTime: string;  // DateTime in ISO format (string)
  interviewLocation: string;
  interviewStatus: string;  // This will be "Pending" or another status
  teamLeadId: string;  // teamLeadId is used as a foreign key reference
}
