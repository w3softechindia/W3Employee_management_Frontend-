export interface Interview {
    employeeId: string;
    employeeName: string;
    clientName?: string; // optional, initially undefined
    clientLocation?: string; // optional, initially undefined
    // Other properties
    companyId: number;
    numberOfRounds: number;
    numberOfRoundsHeld: number;
    status: string;
}