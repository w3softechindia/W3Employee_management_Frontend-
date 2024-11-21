import { Role } from "./Role";

export class Employee{
    
        employeeId :string;
        firstName  : string;
        lastName : string;
        address : string;
        webMail : string;
        webMailPassword : string;
        employeeEmail : string;
        employeePassword : string;
        jobRole: string;
        phoneNumber : number;
        role : string;
        photoUrl: string | ArrayBuffer | null;
        status:string;
        dateOfJoin:string;
        roles : Role[];

}