import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { response } from 'express';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';

@Component({
  selector: 'app-pay-slips',
  templateUrl: './pay-slips.component.html',
  styleUrls: ['./pay-slips.component.scss']
})
export class PaySlipsComponent implements OnInit {
  // applicants: Applicant[] = [];
  leave: Leave[]=[];
  showPopup: boolean;
selectedDetail: any;
  



  constructor(
    private leaveService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchPayslips();
  }

  fetchPayslips():void {
    this.leaveService.getPaySlipRequests().subscribe(
      (data:Leave[])=>{
        console.log(data);
        this.leave=data;
              },
              (error: any) => {
                console.error('Error fetching Leaves:', error);
              }
    )
  }
  
  openRelievingForm(request: Leave): void {
    this.selectedDetail = request;
    this.showPopup = true;
  }

  // Close popup
  closeRelievingForm(): void {
    this.showPopup = false;
    this.selectedDetail = null;
  }

  // Update payslip status
  // 
//   updatePayslipStatus(status: string): void {
//   if (this.selectedDetail) {
//     // Prepare the reply message based on the status
//     const replyMsg =
//       status === 'Rejected'
//         ? 'Your payslip request has been rejected.'
//         : 'Your payslip has been generated.';
//     const leaveId = this.selectedDetail.leaveId;

//     // Log details for debugging
//     console.log('Updating payslip:', {
//       status,
//       replyMsg,
//       leaveId,
//       employeeId: this.selectedDetail.employeeId,
//     });

//     // Call the API to update the status
//     this.leaveService.processPayslip(this.selectedDetail.employeeId, status, replyMsg, leaveId).subscribe(
//       (response) => {
//         console.log(`Payslip status updated to: ${status}`);
//         const successMessage =
//           status === 'Rejected'
//             ? 'Payslip request successfully rejected.'
//             : 'Payslip successfully generated.';
//         alert(successMessage); // Notify the user
//         this.fetchPayslips(); // Refresh the table
//         this.closeRelievingForm(); // Close the popup
//       },
//       (error) => {
//         console.error('Error processing payslip:', error);
//         alert('Failed to update payslip status. Please try again.');
//       }
//     );
//   }
// }
// updatePayslipStatus(status: string): void {
//   if (this.selectedDetail) {
//     // Prepare the reply message based on the status
//     const replyMsg =
//       status === 'Rejected'
//         ? 'Your payslip request has been rejected.'
//         : 'Your payslip has been generated.';
//     const leaveId = this.selectedDetail.leaveId;

//     // Log details for debugging
//     console.log('Updating payslip:', {
//       status,
//       replyMsg,
//       leaveId,
//       employeeId: this.selectedDetail.employeeId,
//     });

//     // Call the API to update the status
//     this.leaveService.processPayslip(this.selectedDetail.employeeId, status, replyMsg, leaveId).subscribe(
//       (response) => {
//         console.log(`Payslip status updated to: ${status}`);
//         const successMessage =
//           status === 'Rejected'
//             ? 'Payslip request successfully rejected.'
//             : 'Payslip successfully generated.';
//         alert(successMessage); // Notify the user
//         this.fetchPayslips(); // Refresh the table
//         this.closeRelievingForm(); // Close the popup
//       },
//       (error) => {
//         console.error('Error processing payslip:', error);
//         alert('Failed to update payslip status. Please try again.');
//       }
//     );
//   }
// }

updatePayslipStatus(status: string): void {
  if (this.selectedDetail) {
    const replyMsg = status === 'Rejected'
      ? 'Your payslip request has been rejected.'
      : 'Your payslip has been generated.';
    const leaveId = this.selectedDetail.leaveId;

    console.log(status, replyMsg, leaveId, this.selectedDetail.employeeId);

    this.leaveService.processPayslip(this.selectedDetail.employeeId, status, replyMsg, leaveId).subscribe(
      (response) => {
        console.log('Response from backend:', response);  // This will be the plain text message
        alert('Payslip status updated successfully.');
        this.fetchPayslips(); // Refresh the table
        this.closeRelievingForm(); // Close the popup
      },
      (error) => {
        console.error('Error processing payslip:', error);
        // Handle non-200 responses properly
        if (error.status !== 200) {
          alert('Failed to process payslip. Please try again.');
        }
      }
    );
  }
}

}

