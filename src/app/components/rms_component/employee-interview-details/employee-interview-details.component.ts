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
  interviewDetails: EmployeeInterviewDetailsDto[] = [];
  isLoading: boolean = true;
  showError: boolean = false;

  showPopup: boolean = false;
  showConfirmation: boolean = false;
  selectedAction: string = '';
  selectedInterviewId: number | null = null;

  constructor(private rmsService: RmsServiceService) {}

  ngOnInit(): void {
    this.getEmployeeInterviewDetails();
  }

  // Fetch interview details from service
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
    this.selectedInterviewId = interviewId;
    this.showPopup = true;
  }

  // Close popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Confirm update action (shortlist or reject)
  confirmUpdate(action: string): void {
    this.selectedAction = action;
    this.showPopup = false;
    this.showConfirmation = true;
  }

  // Close confirmation dialog
  closeConfirmation(): void {
    this.showConfirmation = false;
  }

  // Update interview status based on user action
  updateStatus(): void {
    if (this.selectedInterviewId !== null && this.selectedAction) {
        this.rmsService.updateInterviewStatus(this.selectedInterviewId, this.selectedAction).subscribe(
            (updatedInterview: Rms_Interview) => {
                console.log('Interview status updated successfully:', updatedInterview);
                alert('Updated Successfully');
                this.refreshInterviewList();
                this.showConfirmation = false;
            },
            error => {
                console.error('Error updating interview status:', error);
                alert('Not Updated');
                this.showConfirmation = false;
            }
        );
    }
}


  // Refresh interview list after update
  refreshInterviewList(): void {
    this.isLoading = true;
    this.getEmployeeInterviewDetails();
  }

  
}
