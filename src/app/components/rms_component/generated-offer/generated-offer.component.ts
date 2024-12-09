import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { Applicant } from 'src/app/Models/applicant';

@Component({
  selector: 'app-generated-offer',
  templateUrl: './generated-offer.component.html',
  styleUrls: ['./generated-offer.component.scss'],
})
export class GeneratedOfferComponent implements OnInit {
  applicants: Applicant[] = []; // To hold the list of applicants
  isLoading: any;
  showError: any;
  selectedInterviewId: number;
  showPopup: boolean;
  selectedAction: string;
  showConfirmation: boolean;
  interviewDetails: any;
  showSuccessPopup: boolean;
  employeePackage: string;
  showEditPackagePopup: boolean;

  constructor(
    private rmsService: RmsServiceService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.fetchApplicants();
  }

  // Fetch all applicants
  fetchApplicants(): void {
    this.rmsService.getApplicantsletter().subscribe(
      (data: Applicant[]) => {
        this.applicants = data;
        // this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching applicants:', error);
      }
    );
  }

  openUpdateStatusPopup(interviewId: number): void {
    this.selectedInterviewId = interviewId;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  confirmUpdate(action: string): void {
    this.selectedAction = action;
    this.showPopup = false;
    this.showConfirmation = true;
  }

  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  updateStatus(): void {
    if (this.selectedInterviewId !== null && this.selectedAction) {
      let updatedStatus: string;

      switch (this.selectedAction) {
        case 'Send Confirmation Mail':
          updatedStatus = 'Confirmation Mail Sent';
          const candidate = this.interviewDetails.find(
            (detail: { interviewId: number; }) => detail.interviewId === this.selectedInterviewId
          );
          break;
        case 'Generate Offer Letter':
          updatedStatus = 'Offer Letter Generated';
          break;
        case 'Reject':
          updatedStatus = 'Rejected';
          break;
        default:
          updatedStatus = '';
      }

      if (updatedStatus) {
        this.rmsService
          .updateInterviewStatus(this.selectedInterviewId, updatedStatus)
          .subscribe(
            (updatedInterview: Rms_Interview) => {
              console.log(
                'Interview status updated successfully:',
                updatedInterview
              );
              this.showSuccessPopup = true;

              setTimeout(() => {
                this.showSuccessPopup = false;
              }, 3000);

              this.refreshInterviewList();
              this.showConfirmation = false;
            },
            (error) => {
              console.error('Error updating interview status:', error);
              alert('Failed to update interview status.');
              this.showConfirmation = false;
            }
          );
      }
    } else {
      alert('Interview ID is missing or invalid.');
    }
  }

  closeSuccessPopup(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('backdrop')) {
      this.showSuccessPopup = false;
    }
  }

  getSuccessMessage(): string {
    switch (this.selectedAction) {
      case 'Send Confirmation Mail':
        return 'Sent Confirmation Mail Successfully!';
      case 'Generate Offer Letter':
        return 'Generated Offer Letter Successfully!';
      case 'Reject':
        return 'Rejected Successfully!';
      default:
        return '';
    }
  }

  refreshInterviewList(): void {
    this.isLoading = true;
    this.getEmployeeInterviewDetails();
  }
  getEmployeeInterviewDetails() {
    throw new Error('Method not implemented.');
  }

  // Open Employee Package edit popup
  openEditPackagePopup(detail: EmployeeInterviewDetailsDto): void {
    this.employeePackage = detail.interviewPackage || ''; // Populate the current package value if available
    this.selectedInterviewId = detail.interviewId;
    this.showEditPackagePopup = true;
  }

  // Close the Edit Package popup
  closeEditPackagePopup(): void {
    this.showEditPackagePopup = false;
  }

  // Save the employee package after editing
  // saveEmployeePackage(): void {
  //   if (
  //     this.selectedInterviewId !== null &&
  //     this.employeePackage.trim() !== ''
  //   ) {
  //     const updatedPackage = this.employeePackage;

  //     // Call the API to update the employee package
  //     this.rmsService
  //       .updateEmployeePackage(this.selectedInterviewId, updatedPackage)
  //       .subscribe(
  //         (response: any) => {
  //           console.log('Employee package updated successfully', response);
  //           this.showSuccessPopup = true;

  //           setTimeout(() => {
  //             this.showSuccessPopup = false;
  //           }, 3000);

  //           this.refreshInterviewList();
  //           this.closeEditPackagePopup();
  //         },

  //         (error: any) => {
  //           console.error('Error updating employee package', error);
  //           alert('Failed to update employee package');
  //         }
  //       );
  //   } else {
  //     alert('Employee Package is empty!');
  //   }
  // }
}
