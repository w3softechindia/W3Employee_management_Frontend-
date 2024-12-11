import { Employee } from "./Employee";

export interface Leave {
    fromDate: any;
    toDate: any;
    totalDays: any;
    tlApproval?: string; // Optional property
    hrApproval?: string; // Optional property
    leaveStatus: string;
    customLeaveType: string;
    leaveId: number;
    employeeId: string;
    employeeName: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    replyMsg: string;
  }
