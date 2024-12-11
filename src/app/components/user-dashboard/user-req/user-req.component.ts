import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-req',
  templateUrl: './user-req.component.html',
  styleUrls: ['./user-req.component.scss'],
})
export class UserReqComponent implements OnInit {
  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  paySlipRequests: any[] = []; // Holds the fetched PaySlip Requests

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private leaveService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      customLeaveType: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
          this.noDirtyDataValidator(),
        ],
      ],
    });

    this.leaveForm.get('leaveType')?.valueChanges.subscribe((value) => {
      this.onLeaveTypeChange(value);
    });

    // Fetch PaySlip Requests on component load
    this.fetchPaySlipRequests();
  }

  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { dirtyData: { value: control.value } } : null;
    };
  }

  onLeaveTypeChange(leaveType: string) {
    const customLeaveTypeControl = this.leaveForm.get('customLeaveType');
    if (customLeaveTypeControl) {
      if (leaveType === 'Others') {
        customLeaveTypeControl.setValidators(Validators.required);
      } else {
        customLeaveTypeControl.clearValidators();
      }
      customLeaveTypeControl.updateValueAndValidity();
    }
  }

  fetchPaySlipRequests() {
    this.leaveService.getPaySlipRequests().subscribe(
      (data) => {
        this.paySlipRequests = data;
        console.log('Fetched PaySlip Requests:', this.paySlipRequests);
      },
      (error) => {
        console.error('Error fetching PaySlip Requests:', error);
      }
    );
  }


  
  createLeave() {
    if (this.leaveForm.invalid) {
      this.showPopup = true;
      this.popupTitle = 'Form Incomplete';
      this.popupMessage = 'Please fill in all mandatory fields before submitting.';
      return;
    }
  
    const leaveData = this.leaveForm.value;
    const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService
  
    if (employeeId) {
      this.leaveService.createLeave(leaveData, employeeId).subscribe(
        response => {
          this.showPopup = true;
          this.popupTitle = 'Success';
          this.popupMessage = 'Your request has been submitted successfully!';
          this.fetchPaySlipRequests(); // Refresh leave data
        },
        error => {
          this.showPopup = true;
          this.popupTitle = 'Fill The Form';
          this.popupMessage = 'There was an error submitting your leave request.';
        }
      );
    }
  }

  // createLeave() {
  //   if (this.leaveForm.valid) {
  //     const leaveData = this.leaveForm.value;
  //     const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService

  //     if (employeeId) {
  //       this.leaveService.createLeave(leaveData, employeeId).subscribe(
  //         (response) => {
  //           this.showPopup = true;
  //           this.popupTitle = 'Success';
  //           this.popupMessage = 'Your Request submitted successfully!';
  //           console.log('Your Request sent successfully');
  //         },
  //         (error) => {
  //           this.showPopup = true;
  //           this.popupTitle = 'Error';
  //           this.popupMessage = 'There was an error submitting your leave request.';
  //           console.log('Error in creating leave', error);
  //         }
  //       );
  //     } else {
  //       console.error('Employee ID is missing');
  //     }
  //   }
  // }
  closePopup() {
    this.showPopup = false;
  }
}
