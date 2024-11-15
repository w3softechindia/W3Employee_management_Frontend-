import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-bdm-leave-request',
  templateUrl: './bdm-leave-request.component.html',
  styleUrls: ['./bdm-leave-request.component.scss']
})
export class BdmLeaveRequestComponent implements OnInit {

  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  
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
      reason: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), this.noDirtyDataValidator()]]
    });

    this.leaveForm.get('leaveType')?.valueChanges.subscribe(value => {
      this.onLeaveTypeChange(value);
    });
  }

  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
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

  createLeave() {
    if (this.leaveForm.valid) {
      const leaveData = this.leaveForm.value;
      const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService

      if (employeeId) {
        this.leaveService.createLeave(leaveData, employeeId).subscribe(
          response => {
            this.showPopup = true;
            this.popupTitle = 'Success';
            this.popupMessage = 'Leave request submitted successfully!';
            console.log("Leave request sent successfully");

               // Reset the form after successful submission
          this.leaveForm.reset(); // Reset the form values
          
          // Optionally set default values for the form
          this.leaveForm.patchValue({
            leaveType: '', // Set the default value for leaveType
            customLeaveType: '', // Set the default value for customLeaveType
            startDate: '', // Set the default value for startDate
            endDate: '', // Set the default value for endDate
            reason: '' // Set the default value for reason
          });
          
          },
          error => {
            this.showPopup = true;
            this.popupTitle = 'Error';
            this.popupMessage = 'There was an error submitting your leave request.';
            console.log("Error in creating leave", error);
          }
        );
      } else {
        console.error("Employee ID is missing");
      }
    }
  }

  closePopup() {
    this.showPopup = false;
  }

}
