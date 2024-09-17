export interface Rms_Interview {
    interviewId?: number; // Optional for creation
    interviewDateTime: string; // ISO 8601 format
    interviewLocation: string;
    interviewStatus?: string; // Optional for creation
    employeeId: string; // Assuming you're sending employeeId to link interview
    panelMembers?: number[]; // List of panel member IDs
    teamLeadId: string;
    employeeName: string;
    employeeEmail:string;
  }