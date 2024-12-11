import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';
import { RmsServiceService } from '../rms-service.service';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';

@Component({
  selector: 'app-pay-slips',
  templateUrl: './pay-slips.component.html',
  styleUrls: ['./pay-slips.component.scss']
})
export class PaySlipsComponent implements OnInit {
  leaveForm: FormGroup;
  leave: Leave[] = [];
  showPopup: boolean;
  showPopup1: boolean;
  selectedDetail: any;
  isSuccess: boolean;
  isLoading: boolean;
  interviewDetails: EmployeeInterviewDetailsDto[] = [];
  showError = false;
  showFullDetails = false;
  showConfirmation = false;
  selectedAction = '';
  comment = '';
  showModal: any;
  detail: any;
  today: string;

  constructor(
    private leaveService: EmployeeService,
    private rmsLeaveService: RmsServiceService,
    private fb: FormBuilder
  ) {
    this.today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    this.leaveForm = this.fb.group({
      employeeId: ['W3S', [
        Validators.required,
        Validators.pattern(/^W3S\d{4}$/) // Regex to match W3S followed by 4 digits
      ]],
      startDate: ['', [Validators.required, this.pastDateValidator.bind(this)]],
      endDate: ['', [Validators.required, this.pastDateValidator.bind(this)]],
      reason: ['', [Validators.required, Validators.minLength(3)]],
      leaveType: ['PaySlip Request', Validators.required],
      status: ['Generated', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchPayslips();
  }

  fetchPayslips(): void {
    this.leaveService.getPaySlipRequests().subscribe(
      (data: Leave[]) => {
        console.log(data);
        this.leave = data;
      },
      (error: any) => {
        console.error('Error fetching Leaves:', error);
      }
    );
  }

  // Custom Validator for Past Dates
  pastDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date(this.today);

    if (selectedDate > today) {
      return { futureDate: true }; // Error if the date is in the future
    }
    return null; // Valid if the date is today or in the past
  }

  openRelievingForm(request: Leave): void {
    this.selectedDetail = request;
    this.showPopup = true;
  }

  closeRelievingForm(): void {
    this.showPopup = false;
    this.selectedDetail = null;
  }

  updatePayslipStatus(status: string): void {
    if (this.selectedDetail) {
      const replyMsg = status === 'Rejected'
        ? 'Your payslip request has been rejected.'
        : 'Your payslip has been generated.';
      const leaveId = this.selectedDetail.leaveId;

      console.log(status, replyMsg, leaveId, this.selectedDetail.employeeId);

      this.leaveService.processPayslip(this.selectedDetail.employeeId, status, replyMsg, leaveId).subscribe(
        (response) => {
          console.log('Response from backend:', response); // This will be the plain text message
          alert('Payslip status updated successfully.');
          this.fetchPayslips(); // Refresh the table
          this.closeRelievingForm(); // Close the popup
        },
        (error) => {
          console.error('Error processing payslip:', error);
          if (error.status !== 200) {
            alert('Failed to process payslip. Please try again.');
          }
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  closePopup1(): void {
    this.showPopup1 = false;
  }

  createLeave(): void {
    alert("hello");
  }

  rmsGeneratePayslip(): void {
    console.log(this.leaveForm);

    if (this.leaveForm.valid) {
      const leave: Leave = this.leaveForm.value;
      const employeeId = this.leaveForm.get('employeeId')?.value;

      this.isLoading = true;

      this.rmsLeaveService.rmsGeneratePayslip(leave, employeeId).subscribe(
        (response) => {
          console.log('Payslip generated:', response);
          this.isSuccess = true;
          this.showPopup1 = false; // Close popup after success
          this.fetchPayslips(); // Refresh the data
          alert("Payslip Generated Successfully..!!");
          this.leaveForm.reset();
        },
        (error) => {
          console.error('Error generating Payslip:', error);
          this.isSuccess = false;
          this.isLoading = false;
          alert('Error generating Payslip. Please try again.');
        }
      );
    } else {
      alert('Form is invalid! Please fill all required fields.');
    }
  }

  toggleColumnVisibility(): void {
    this.showFullDetails = !this.showFullDetails;
  }

  viewDetails(detail: any): void {
    this.selectedDetail = detail;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedDetail = null;
  }
}
