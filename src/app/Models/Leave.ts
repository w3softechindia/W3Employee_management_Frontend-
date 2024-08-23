export interface Leave {
    leaveId?: number;
    employeeId: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status?: string; // "PENDING", "APPROVED", "REJECTED"
    
}
