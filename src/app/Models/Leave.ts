export interface Leave {
customLeaveType: any;
    leaveId?: any;
    employeeId: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string; // "PENDING", "APPROVED", "REJECTED"   if status == generated payslip & rejected(email)
    replyMsg: string
}
