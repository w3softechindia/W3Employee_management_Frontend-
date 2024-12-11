import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { RelievingCandidate } from 'src/app/Models/RelievingCandidate';

@Component({
  selector: 'app-relieving-form',
  templateUrl: './increment-emp.component.html',
  styleUrls: ['./increment-emp.component.scss']
})
export class IncrementEmpComponent implements OnInit {
  relieve: RelievingCandidate[] = [];
  leaveForm: FormGroup;
  isLoading = false;
  showError = false;
  showPopup = false;
  showSuccessPopup = false;
  selectedRelieveId: number;
  showStatusPopup: boolean;
  todayDate: string;

  constructor(
    private leaveService: EmployeeService,
    private fb: FormBuilder
  ) {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD

    this.leaveForm = this.fb.group({
      employeeId: [
        'W3S', [ // Initial value is 'W3S'
          Validators.required,
          Validators.pattern(/^W3S\d{4}$/) // Regex to match W3S followed by 4 digits
        ]
      ],
      
      
      resignDate: ['', [Validators.required, this.futureOrTodayDateValidator.bind(this)]],
      relieveDate: ['', [Validators.required, this.futureOrTodayDateValidator.bind(this)]],
      reason: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.fetchRelievingList();
  }

  fetchRelievingList(): void {
    this.leaveService.getRelievingList().subscribe(
      (data: RelievingCandidate[]) => {
        console.log(data);
        this.relieve = data;
      },
      (error: any) => {
        console.error('Error fetching Leaves:', error);
      }
    );
  }

  openRelievingForm(detail?: any): void {
    if (detail) {
      this.leaveForm.setValue({ ...detail }); // Populate formData if the detail is passed
    } else {
      this.leaveForm.reset(); // Reset the form for new data
    }
    this.showPopup = true;
  }

  closepopup(): void {
    this.showPopup = false;
  }

  submitRelievingForm(): void {
    if (this.leaveForm.valid) {
      this.isLoading = true;

      const formData = this.leaveForm.value;
      this.leaveService.relieveEmployee(formData).subscribe(
        (response: any) => {
          console.log('Relieving form submitted successfully:', response);
          this.showPopup = false; // Close the form popup
          this.showSuccessPopup = true; // Show success popup
          this.isLoading = false; // Hide loading indicator
          this.fetchRelievingList(); // Refresh the list of relieving employees
        },
        (error: any) => {
          console.error('Error submitting relieving form:', error);
          alert('Failed to submit relieving form. Please try again.');
          this.isLoading = false; // Hide loading indicator
        }
      );
    } else {
      console.log("Invalid form", this.leaveForm);
    }
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  // Update status for relieving candidate
  updateRelievingStatus(status: string, relieveId: number): void {
    this.leaveService.updateRelievingStatus(relieveId, status).subscribe(
      (data: any) => {
        console.log(`Status updated to: ${status}`, relieveId);
        this.fetchRelievingList(); // Refresh the list after update
        alert('Status updated successfully!');
        this.showStatusPopup = false;
      },
      (error: any) => {
        console.error('Error updating status:', error);
        alert('Failed to update status. Please try again.');
      }
    );
  }

  openStatusPopup(relieveId: number): void {
    this.selectedRelieveId = relieveId;
    this.showStatusPopup = true;
  }

  closeStatusPopup(): void {
    this.showStatusPopup = false;
  }

  // Custom Validator for Future or Today's Date
  private futureOrTodayDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date(this.todayDate);

    if (selectedDate < today) {
      return { pastDate: true }; // Invalid if the date is in the past
    }
    return null; // Valid if the date is today or in the future
  }
}
