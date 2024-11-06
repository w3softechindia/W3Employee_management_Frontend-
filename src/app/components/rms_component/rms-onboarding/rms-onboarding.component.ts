
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { RmsServiceService } from '../rms-service.service';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';

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
  selectedAction: string = '';
  selectedInterviewId: number | null = null;
  statusMessage: string = '';
  selectedFiles: File[] = []; // Array to hold selected files

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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  confirmUpdate(action: string): void {
    this.selectedAction = action;
    this.showPopup = false;
    this.showConfirmation = true;
  }

  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  // Method to send confirmation mail with Google Form link
  sendConfirmationMail(email: string): void {
    // const googleFormUrl = 'https://forms.gle/1UzyomyzVZZ7uiyGA';

    // // HTTP POST request to backend to send confirmation mail
    // this.http.post('/api/mail/sendConfirmation', {
    //   recipientEmail: email,
    //   googleFormLink: googleFormUrl
    // }).subscribe(
    //   () => {
    //     alert("Confirmation mail sent successfully!");
    //   },
    //   error => {
    //     console.error("Failed to send mail", error);
    //     alert("Failed to send confirmation mail.");
    //   }
    // );
  }

  updateStatus(): void {
    if (this.selectedInterviewId !== null && this.selectedAction) {
      let updatedStatus: string;

      switch (this.selectedAction) {
        case 'Send Confirmation Mail':
          updatedStatus = 'Confirmation Mail Sent';
          // Call the sendConfirmationMail method with the candidate’s email
          const candidateEmail = 'candidate@example.com';  // Replace with actual email
          this.sendConfirmationMail(candidateEmail);
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

      console.log(`Updating interview status: ${updatedStatus} for interview ID: ${this.selectedInterviewId}`);

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
