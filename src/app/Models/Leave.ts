export interface Leave {
customLeaveType: any;
    leaveId?: number;
    employeeId: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string; // "PENDING", "APPROVED", "REJECTED"
    
}
