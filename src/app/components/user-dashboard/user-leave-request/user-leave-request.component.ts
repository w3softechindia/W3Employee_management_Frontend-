// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from 'src/app/employee.service';
// import { Leave } from 'src/app/Models/Leave';

// @Component({
//   selector: 'app-user-leave-request',
//   templateUrl: './user-leave-request.component.html',
//   styleUrls: ['./user-leave-request.component.scss']
// })
// export class UserLeaveRequestComponent implements OnInit {
//   leaveForm: FormGroup;
//   showPopup = false;
//   popupTitle = '';
//   popupMessage = '';
//   specificLeaves: Leave[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private leaveService: EmployeeService
//   ) {}

//   ngOnInit(): void {
//     this.leaveForm = this.fb.group({
//       leaveType: ['', Validators.required],
//       customLeaveType: [''],
//       startDate: ['', Validators.required],
//       endDate: ['', Validators.required],
//       reason: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), this.noDirtyDataValidator()]]
//     });

//     this.leaveForm.get('leaveType')?.valueChanges.subscribe(value => {
//       this.onLeaveTypeChange(value);
//     });

//     // Fetch specific leave types on component load
//     this.getSpecificLeaveTypes();
//   }

//   noDirtyDataValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//       const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
//       return forbidden ? { 'dirtyData': { value: control.value } } : null;
//     };
//   }

//   onLeaveTypeChange(leaveType: string) {
//     const customLeaveTypeControl = this.leaveForm.get('customLeaveType');
//     if (customLeaveTypeControl) {
//       if (leaveType === 'Others') {
//         customLeaveTypeControl.setValidators(Validators.required);
//       } else {
//         customLeaveTypeControl.clearValidators();
//       }
//       customLeaveTypeControl.updateValueAndValidity();
//     }
//   }

//   createLeave() {
//     if (this.leaveForm.invalid) {
//       this.showPopup = true;
//       this.popupTitle = 'Form Incomplete';
//       this.popupMessage = 'Please fill in all mandatory fields before submitting.';
//       return;
//     }

//     const leaveData = this.leaveForm.value;
//     const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService

//     if (employeeId) {
//       this.leaveService.createLeave(leaveData, employeeId).subscribe(
//         response => {
//           this.showPopup = true;
//           this.popupTitle = 'Success';
//           this.popupMessage = 'Your request has been submitted successfully!';
//           this.getSpecificLeaveTypes(); // Refresh leave data
//         },
//         error => {
//           this.showPopup = true;
//           this.popupTitle = 'Error';
//           this.popupMessage = 'There was an error submitting your leave request.';
//         }
//       );
//     }
//   }

//   getSpecificLeaveTypes() {
//     this.leaveService.getSpecificLeaveTypes().subscribe(
//       (leaves: Leave[]) => {
//         this.specificLeaves = leaves;
//       },
//       error => {
//         console.error('Error fetching specific leave types:', error);
//       }
//     );
//   }

//   closePopup() {
//     this.showPopup = false;
//   }
// }

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';

@Component({
  selector: 'app-user-leave-request',
  templateUrl: './user-leave-request.component.html',
  styleUrls: ['./user-leave-request.component.scss'],
})
export class UserLeaveRequestComponent implements OnInit {
  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  specificLeaves: Leave[] = [];
  minDate: string; // Added property for minimum date

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private leaveService: EmployeeService
  ) {}

  ngOnInit(): void {
    // Calculate today's date in YYYY-MM-DD format
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

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

    // Fetch specific leave types on component load
    this.getSpecificLeaveTypes();
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

  createLeave() {
    if (this.leaveForm.invalid) {
      this.showPopup = true;
      this.popupTitle = 'Please complete the form';
      this.popupMessage =
        'Please fill in all mandatory fields before submitting.';
      return;
    }

    const leaveData = this.leaveForm.value;
    const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService

    if (employeeId) {
      this.leaveService.createLeave(leaveData, employeeId).subscribe(
        (response) => {
          this.showPopup = true;
          this.popupTitle = 'Success';
          this.popupMessage = 'Your request has been submitted successfully!';
          this.getSpecificLeaveTypes(); // Refresh leave data
        },
        (error) => {
          this.showPopup = true;
          this.popupTitle = 'Error';
          this.popupMessage =
            'There was an error submitting your leave request.';
        }
      );
    }
  }

  getSpecificLeaveTypes() {
    this.leaveService.getSpecificLeaveTypes().subscribe(
      (leaves: Leave[]) => {
        this.specificLeaves = leaves;
      },
      (error) => {
        console.error('Error fetching specific leave types:', error);
      }
    );
  }

  closePopup() {
    this.showPopup = false;
  }
}
