import { Component, OnInit } from '@angular/core';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { RmsServiceService } from '../rms-service.service';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';

@Component({
  selector: 'app-employee-interview-details',
  templateUrl: './employee-interview-details.component.html',
  styleUrls: ['./employee-interview-details.component.scss']
})
export class EmployeeInterviewDetailsComponent implements OnInit {
openConfirmation() {
throw new Error('Method not implemented.');
}
  interviewDetails: EmployeeInterviewDetailsDto[] = [];
  isLoading: boolean = true;
  showError: boolean = false;
  showSuccessPopup: boolean = false; // Add this property


  showPopup: boolean = false;
  showConfirmation: boolean = false;
  selectedAction: string = '';
  selectedInterviewId: number | null = null;  // Initialize to null
  statusMessage: string = '';

  constructor(private rmsService: RmsServiceService) {}

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

  // Open popup to select shortlist or reject
  openUpdateStatusPopup(interviewId: number): void {
    this.selectedInterviewId = interviewId;  // Capture interview ID when user clicks the "Update" button
    this.showPopup = true;
  }

  // Close popup
  closePopup(): void {
    this.showPopup = false;
  }
  selectedFiles: File[] = []; // Array to hold selected files

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      // Convert FileList to an array
      this.selectedFiles = Array.from(input.files);
    }
  }
  // Confirm update action (shortlist or reject)
// Confirm update action (shortlist or reject)
confirmUpdate(action: string): void {
  this.selectedAction = action.toLowerCase();  // Store the action as lowercase
  this.showPopup = false;
  this.showConfirmation = true;
}


  // Close confirmation dialog
  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  updateStatus(): void {
    if (this.selectedInterviewId !== null && this.selectedAction) {
      let updatedStatus: string;
  
      // Map the selected action to the appropriate status
      switch (this.selectedAction.toLowerCase()) {
        case 'select':
          updatedStatus = 'Selected';
          break;
        case 'reject':
          updatedStatus = 'Rejected';
          break;
        case 'confirm':
          updatedStatus = 'Under Verification';
          break;
        default:
          updatedStatus = '';
      }
  
      console.log(`Updating interview status: ${updatedStatus} for interview ID: ${this.selectedInterviewId}`);
  
      // Call the service to update the interview status
      this.rmsService.updateInterviewStatus(this.selectedInterviewId, updatedStatus).subscribe(
        (updatedInterview: Rms_Interview) => {
          console.log('Interview status updated successfully:', updatedInterview);
          this.showSuccessPopup = true; // Show success popup
  
          // Hide the success popup after 3 seconds
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
  
// Add this method to your component
closeSuccessPopup(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains('backdrop')) {
      this.showSuccessPopup = false; // Close popup when backdrop is clicked
  }
}

getSuccessMessage(): string {
  switch (this.selectedAction) {
    case 'select':
      return 'Selected Successfully!';
    case 'reject':
      return 'Rejected Successfully!';
    case 'confirm':
      return 'Verification Process Initiated!';
    default:
      return '';
  }
}





  // Refresh interview list after update
  refreshInterviewList(): void {
    this.isLoading = true;
    this.getEmployeeInterviewDetails();
  }
}
