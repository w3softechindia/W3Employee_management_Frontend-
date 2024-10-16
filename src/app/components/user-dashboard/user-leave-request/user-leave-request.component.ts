import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-leave-request',
  templateUrl: './user-leave-request.component.html',
  styleUrls: ['./user-leave-request.component.scss']
})
export class UserLeaveRequestComponent implements OnInit {
  
  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private leaveService: EmployeeService // Updated service name
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      customLeaveType: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required,Validators.minLength(6), Validators.maxLength(100),this.noDirtyDataValidator()]
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

      this.leaveService.createLeave(leaveData).subscribe(
        response => {
          this.showPopup = true;
          this.popupTitle = 'Success';
          this.popupMessage = 'Leave request submitted successfully!';
          console.log("leave request send successfully");
        },
        error => {
          this.showPopup = true;
          this.popupTitle = 'Error';
          this.popupMessage = 'There was an error submitting your leave request.';
          console.log("error in creating Leave",error);
        }
      );
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
