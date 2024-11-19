import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { RmsServiceService } from '../rms-service.service';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';

@Component({
  selector: 'app-rms-onboarding',
  templateUrl: './rms-onboarding.component.html',
  styleUrls: ['./rms-onboarding.component.scss']
})
export class RmsOnboardingComponent implements OnInit {
  interviewDetails: EmployeeInterviewDetailsDto[] = [];
  isLoading: boolean = true;
  showError: boolean = false;
  showSuccessPopup: boolean = false;
  showPopup: boolean = false; // Update status popup
  showEditPopup: boolean = false; // Edit interview details popup
  showConfirmation: boolean = false;
  selectedAction: string = '';
  selectedInterviewId: number | null = null;
  statusMessage: string = '';
  selectedFiles: File[] = [];
  emailConfirmation: EmailConfirmationDto = new EmailConfirmationDto();

  constructor(private rmsService: RmsServiceService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployeeInterviewDetails();
  }

  getEmployeeInterviewDetails(): void {
    this.rmsService.getAllEmployeeInterviewDetails().subscribe(
      (data: EmployeeInterviewDetailsDto[]) => {
        this.interviewDetails = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching employee interview details:', error);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }

  openUpdateStatusPopup(interviewId: number): void {
    this.selectedInterviewId = interviewId;
    this.showPopup = true;  // Show the update status popup
    this.showEditPopup = false;  // Close the edit form popup if open
  }

  openEditForm(detail: EmployeeInterviewDetailsDto): void {
    this.selectedInterviewId = detail.interviewId;
    this.selectedAction = 'Edit';
    this.emailConfirmation.recipientEmail = detail.employeeEmail;
    this.emailConfirmation.jobRole = detail.jobRole;
    this.showEditPopup = true;  // Show the edit interview details popup
    this.showPopup = false;  // Close the update status popup if open
  }

  closePopup(): void {
    this.showPopup = false;
    this.showEditPopup = false;
  }

  confirmEdit(): void {
    if (this.selectedInterviewId !== null) {
      this.rmsService.updateInterviewDetails(this.selectedInterviewId, this.emailConfirmation).subscribe(
        (updatedInterview: Rms_Interview) => {
          console.log('Interview details updated successfully:', updatedInterview);
          this.showSuccessPopup = true;
          this.selectedInterviewId = null;
          setTimeout(() => {
            this.showSuccessPopup = false;
          }, 3000);
          this.refreshInterviewList();
          this.showEditPopup = false; // Close the edit popup
        },
        error => {
          console.error('Error updating interview details:', error);
          alert('Failed to update interview details.');
          this.showEditPopup = false;
        }
      );
    } else {
      alert('Interview ID is missing or invalid.');
    }
  }

  confirmUpdate(action: string): void {
    this.selectedAction = action;
    this.showPopup = false;
    this.showConfirmation = true;
  }

  // updateStatus(): void {
  //   if (this.selectedInterviewId !== null && this.selectedAction) {
  //     let updatedStatus: string;

  //     switch (this.selectedAction) {
  //       case 'Send Confirmation Mail':
  //         updatedStatus = 'Confirmation Mail Sent';
  //         break;
  //       case 'Generate Offer Letter':
  //         updatedStatus = 'Offer Letter Generated';
  //         break;
  //       case 'Reject':
  //         updatedStatus = 'Rejected';
  //         break;
  //       default:
  //         updatedStatus = '';
  //     }

  //     if (updatedStatus) {
  //       this.rmsService.updateInterviewStatus(this.selectedInterviewId, updatedStatus).subscribe(
  //         (updatedInterview: Rms_Interview) => {
  //           console.log('Interview status updated successfully:', updatedInterview);
  //           this.showSuccessPopup = true;

  //           setTimeout(() => {
  //             this.showSuccessPopup = false;
  //           }, 3000);

  //           this.refreshInterviewList();
  //           this.showConfirmation = false;
  //         },
  //         error => {
  //           console.error('Error updating interview status:', error);
  //           alert('Failed to update interview status.');
  //           this.showConfirmation = false;
  //         }
  //       );
  //     }
  //   } else {
  //     alert('Interview ID is missing or invalid.');
  //   }
  // }

  // closeConfirmation(): void {
  //   this.showConfirmation = false;
  // }

  // closeSuccessPopup(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;
  //   if (target.classList.contains('backdrop')) {
  //     this.showSuccessPopup = false;
  //   }
  // }

  // getSuccessMessage(): string {
  //   switch (this.selectedAction) {
  //     case 'Send Confirmation Mail':
  //       return 'Sent Confirmation Mail Successfully!';
  //     case 'Generate Offer Letter':
  //       return 'Generated Offer Letter Successfully!';
  //     case 'Reject':
  //       return 'Rejected Successfully!';
  //     case 'Edit':
  //       return 'Updated Interview Details Successfully!';
  //     default:
  //       return '';
  //   }
  // }

  // refreshInterviewList(): void {
  //   this.isLoading = true;
  //   this.getEmployeeInterviewDetails();
  // }
  


  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  updateStatus(): void {
    if (this.selectedInterviewId !== null && this.selectedAction) {
      let updatedStatus: string;

      switch (this.selectedAction) {
        case 'Send Confirmation Mail':
          updatedStatus = 'Confirmation Mail Sent';
          const candidate = this.interviewDetails.find(detail => detail.interviewId === this.selectedInterviewId);
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
        this.rmsService.updateInterviewStatus(this.selectedInterviewId, updatedStatus).subscribe(
          (updatedInterview: Rms_Interview) => {
            console.log('Interview status updated successfully:', updatedInterview);
            this.showSuccessPopup = true;

            setTimeout(() => {
              this.showSuccessPopup = false;
            }, 3000);

            this.refreshInterviewList();
            this.showConfirmation = false;
          },
          error => {
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
}
