// // import { HttpClient } from '@angular/common/http';
// // import { Component, OnInit } from '@angular/core';
// // import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
// // import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
// // import { Rms_Interview } from 'src/app/Models/Rms_Interview';
// // import { RmsServiceService } from '../rms-service.service';

// // @Component({
// //   selector: 'app-pay-slips',
// //   templateUrl: './pay-slips.component.html',
// //   styleUrls: ['./pay-slips.component.scss']
// // })

// // export class PaySlipsComponent implements OnInit {
// //   interviewDetails: EmployeeInterviewDetailsDto[] = [];
// //   isLoading: boolean = true;
// //   showError: boolean = false;
// //   showSuccessPopup: boolean = false;

// //   showPopup: boolean = false;
// //   showConfirmation: boolean = false;
// //   selectedAction: string = '';
// //   selectedInterviewId: number | null = null;
// //   statusMessage: string = '';
// //   selectedFiles: File[] = [];
// //   emailConfirmation: EmailConfirmationDto = new EmailConfirmationDto();
// //   comment: string = '';

// //   showFullDetails: boolean = false; // Controls column visibility

// //   constructor(private rmsService: RmsServiceService, private http: HttpClient) {}

// //   ngOnInit(): void {
// //     this.getEmployeeInterviewDetails();
// //   }

// //   getEmployeeInterviewDetails(): void {
// //     this.rmsService.getAllEmployeeInterviewDetails().subscribe(
// //       (data: EmployeeInterviewDetailsDto[]) => {
// //         this.interviewDetails = data;
// //         this.isLoading = false;
// //       },
// //       error => {
// //         console.error('Error fetching employee interview details:', error);
// //         this.isLoading = false;
// //         this.showError = true;
// //       }
// //     );
// //   }

// //   openUpdateStatusPopup(interviewId: number): void {
// //     this.selectedInterviewId = interviewId;
// //     this.showPopup = true;
// //   }

// //   closePopup(): void {
// //     this.showPopup = false;
// //   }

// //   confirmUpdate(action: string): void {
// //     this.selectedAction = action;
// //     this.showPopup = false;
// //     this.showConfirmation = true;
// //   }

// //   closeConfirmation(): void {
// //     this.showConfirmation = false;
// //   }

// //   updateStatus(): void {
// //     if (this.selectedInterviewId !== null && this.selectedAction) {
// //       let updatedStatus: string;

// //       switch (this.selectedAction) {
// //         case 'Send Confirmation Mail':
// //           updatedStatus = 'Confirmation Mail Sent';
// //           break;
// //         case 'Generate Offer Letter':
// //           updatedStatus = 'Offer Letter Generated';
// //           break;
// //         case 'Reject':
// //           updatedStatus = 'Rejected';
// //           break;
// //         default:
// //           updatedStatus = '';
// //       }

// //       if (updatedStatus) {
// //         this.rmsService.updateInterviewStatus(this.selectedInterviewId, updatedStatus).subscribe(
// //           (updatedInterview: Rms_Interview) => {
// //             console.log('Interview status updated successfully:', updatedInterview);
// //             this.showSuccessPopup = true;

// //             setTimeout(() => {
// //               this.showSuccessPopup = false;
// //             }, 3000);

// //             this.refreshInterviewList();
// //             this.showConfirmation = false;
// //           },
// //           error => {
// //             console.error('Error updating interview status:', error);
// //             alert('Failed to update interview status.');
// //             this.showConfirmation = false;
// //           }
// //         );
// //       }
// //     } else {
// //       alert('Interview ID is missing or invalid.');
// //     }
// //   }

// //   closeSuccessPopup(event: MouseEvent): void {
// //     const target = event.target as HTMLElement;
// //     if (target.classList.contains('backdrop')) {
// //       this.showSuccessPopup = false;
// //     }
// //   }

// //   getSuccessMessage(): string {
// //     switch (this.selectedAction) {
// //       case 'Send Confirmation Mail':
// //         return 'Sent Confirmation Mail Successfully!';
// //       case 'Generate Offer Letter':
// //         return 'Generated Offer Letter Successfully!';
// //       case 'Reject':
// //         return 'Rejected Successfully!';
// //       default:
// //         return '';
// //     }
// //   }

// //   refreshInterviewList(): void {
// //     this.isLoading = true;
// //     this.getEmployeeInterviewDetails();
// //   }

// //   // Toggle visibility of full details columns
// //   toggleColumnVisibility(): void {
// //     this.showFullDetails = !this.showFullDetails;
// //   }
// // }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';

@Component({
  selector: 'app-pay-slips',
  templateUrl: './pay-slips.component.html',
  styleUrls: ['./pay-slips.component.scss']
})
export class PaySlipsComponent implements OnInit {
//   // interviewDetails: EmployeeInterviewDetailsDto[] = [];

    interviewDetails = [
      {
        employeeId: 1,
        employeeEmail: 'john.doe@example.com',
        fromDate: '2024-01-01',
        toDate: '2024-01-31',
        employeeName: 'John Doe',
        dateOfJoin: '2020-05-10',
        designation: 'Software Engineer',
        bank: 'Bank A',
        ifscCode: 'IFSC001',
        accountNo: '1234567890',
        pan: 'ABCDE1234F',
        uan: 'UAN001',
        pfid: 'PF001',
        package: '5 LPA',
        basicPA: '2 LPA',
        hraPA: '1 LPA',
        conAllowPA: '0.5 LPA',
        medAllowPA: '0.3 LPA',
        othAllowPA: '0.2 LPA',
        grossPM: '40,000',
        pt: '200',
        pf: '1500',
        ded: '500',
        lop: '0',
        tds: '1000',
        adjust: '100',
        deduc: '0',
        totalDeduc: '3300',
        netSal: '36600'
      },
      {
        employeeId: 2,
        employeeEmail: 'jane.smith@example.com',
        fromDate: '2024-01-01',
        toDate: '2024-01-31',
        employeeName: 'Jane Smith',
        dateOfJoin: '2021-02-15',
        designation: 'QA Analyst',
        bank: 'Bank B',
        ifscCode: 'IFSC002',
        accountNo: '0987654321',
        pan: 'ABCDE5678G',
        uan: 'UAN002',
        pfid: 'PF002',
        package: '4.5 LPA',
        basicPA: '1.8 LPA',
        hraPA: '0.9 LPA',
        conAllowPA: '0.4 LPA',
        medAllowPA: '0.2 LPA',
        othAllowPA: '0.2 LPA',
        grossPM: '37,500',
        pt: '200',
        pf: '1200',
        ded: '400',
        lop: '1',
        tds: '900',
        adjust: '50',
        deduc: '100',
        totalDeduc: '2850',
        netSal: '34650'
      }
    ];
  
//     isLoading = false;
//     showError = false;
//     showPopup = false;
//     showFullDetails = false;
//     showConfirmation = false;
//     selectedAction = '';
//     comment = '';
  
//     constructor() {}
  
//     ngOnInit(): void {}
  
//     openUpdateStatusPopup(employeeId: string) {
//       this.showPopup = true;
//     }
  
//     confirmUpdate(action: string) {
//       this.selectedAction = action;
//       this.showPopup = false;
//       this.showConfirmation = true;
//     }
  
//     updateStatus() {
//       // Here, handle the update status action
//       console.log(`Updating status with action: ${this.selectedAction}`);
//       this.closeConfirmation();
//     }
  
//     closeConfirmation() {
//       this.showConfirmation = false;
//       this.selectedAction = '';
//       this.comment = '';
//     }
  
//     toggleColumnVisibility() {
//       this.showFullDetails = !this.showFullDetails;
//     }
//   }

  isLoading = true;
  showError = false;
  // interviewDetails = []; // Assume this gets populated with interview data
  showFullDetails = true; // You can toggle to show more or less details
  showModal = false; // Modal visibility flag
  selectedDetail: any = null; // Holds the selected employee details for the modal

  ngOnInit(): void {
    // Load interview details here
    // For example, this could be a service call that retrieves data from an API
  }

  // Function to open the modal with the selected interview details
  viewDetails(detail: any): void {
    this.selectedDetail = detail;
    this.showModal = true;
  }

  
  // Close the modal
  closeModal(): void {
    this.showModal = false;
    this.selectedDetail = null;
  }

  // Function for updating the interview status (you can define its functionality based on your requirements)
  openUpdateStatusPopup(employeeId: number): void {
    // Your update status logic here
    console.log('Updating status for employee:', employeeId);
  }
}