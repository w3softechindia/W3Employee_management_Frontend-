import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { HttpClient } from '@angular/common/http';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';

@Component({
  selector: 'app-employee-listt',
  templateUrl: './employee-listt.component.html',
  styleUrls: ['./employee-listt.component.scss']
})
export class EmployeeListtComponent {
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
  emailConfirmation:EmailConfirmationDto=new EmailConfirmationDto();

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
}