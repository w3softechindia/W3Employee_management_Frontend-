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
  showPopup: boolean = false;
  showConfirmation: boolean = false;
  showEditPackagePopup: boolean = false; // Flag for the Edit Package Popup
  selectedAction: string = '';
  selectedInterviewId: number | null = null;
  statusMessage: string = '';
  selectedFiles: File[] = []; // Array to hold selected files
  emailConfirmation: EmailConfirmationDto = new EmailConfirmationDto();
  employeePackage: string = ''; // Variable to hold employee package

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

  // Open Employee Package edit popup
  openEditPackagePopup(detail: EmployeeInterviewDetailsDto): void {
    this.employeePackage = detail.employeePackage || ''; // Populate the current package value if available
    this.selectedInterviewId = detail.interviewId;
    this.showEditPackagePopup = true;
  }

  // Close the Edit Package popup
  closeEditPackagePopup(): void {
    this.showEditPackagePopup = false;
  }

  // Save the employee package after editing
  saveEmployeePackage(): void {
    if (this.selectedInterviewId !== null && this.employeePackage.trim() !== '') {
      const updatedPackage = this.employeePackage;
      
      // Call the API to update the employee package
      this.rmsService.updateEmployeePackage(this.selectedInterviewId, updatedPackage).subscribe(
        response => {
          console.log('Employee package updated successfully', response);
          this.showSuccessPopup = true;

          setTimeout(() => {
            this.showSuccessPopup = false;
          }, 3000);

          this.refreshInterviewList();
          this.closeEditPackagePopup();
        },
        error => {
          console.error('Error updating employee package', error);
          alert('Failed to update employee package');
        }
      );
    } else {
      alert('Employee Package is empty!');
    }
  }
}
