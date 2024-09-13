import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-leave-request',
  templateUrl: './user-leave-request.component.html',
  styleUrls: ['./user-leave-request.component.scss']
})
export class UserLeaveRequestComponent {
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
      reason: ['', Validators.required]
    });

    this.leaveForm.get('leaveType')?.valueChanges.subscribe(value => {
      this.onLeaveTypeChange(value);
    });
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
        },
        error => {
          this.showPopup = true;
          this.popupTitle = 'Error';
          this.popupMessage = 'There was an error submitting your leave request.';
        }
      );
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
