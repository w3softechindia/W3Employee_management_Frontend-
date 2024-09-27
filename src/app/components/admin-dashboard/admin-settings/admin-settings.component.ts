import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  employeeForm: FormGroup;
  resetPasswordForm: FormGroup;
  employee: Employee;
  employeeId: string;
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;



  employee1!: Employee;
  employeeId1!: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  password: string;
  emailStatus: boolean = false;
  phoneNumberStatus: boolean = false;

  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');
    this.errorIcon =this.sanitizer.bypassSecurityTrustHtml('&#9888;');
  }
  noNumbersValidator(control:any){
    const regex=/^[A-Za-z]*$/;
    return regex.test(control.value)? null : {noNumbers:true}
  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),this.noNumbersValidator]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20),this.noNumbersValidator]],
      address: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });

    this.resetPasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['',
          [Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    this.employeeId = this.auth.getEmployeeId();
    if (this.employeeId) {
      this.getEmployeeDetails();
    } else {
      console.log('Employee ID is not set');
    }
  }


  onPhoneNumberInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (!value.startsWith('+91')) {
      value = '+91' + value.replace(/^\+91/, '');
    }

    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    input.value = value;
    this.employeeForm.get('phoneNumber')?.setValue(value, { emitEvent: false });
  }

  onPhoneNumberKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    // Prevent backspace if the cursor is at position 3 or less (before or on +91)
    if (event.key === 'Backspace' && input.selectionStart !== null && input.selectionStart <= 3) {
      event.preventDefault();
    }
  }
  getEmployeeDetails() {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (res: Employee) => {
        this.employee = res;

        console.log("Employee data retrieved:", this.employee.firstName);

        this.employeeForm.patchValue({
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          address: this.employee.address,
          employeeEmail: this.employee.employeeEmail,
          phoneNumber: this.employee.phoneNumber,
        });
      },
      (error: any) => {
        console.log(error);
        this.showError('Failed to load employee details.');
      }
    );
  }


  updateEmployee() {
    if (!this.employeeForm.invalid) {
      this.employee = this.employeeForm.value;
      this.employeeService.updateEmployeeDetails(this.employeeId, this.employee).subscribe(
        (res: any) => {
          this.employee = res;

          console.log('updated  details', this.employee.firstName);

          this.showSuccess('Profile updated successfully..!!');
          console.log("Updated Successfully");
          
        },
        (error: any) => {
          console.log(error);
          this.showError('Failed to update profile..!!');
          
          console.log("Updated Failed");
        }
      );
    }
    else {
      console.log("invalid data entered");
      this.showError("Please fill form currectly");
    }
  }


  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } =
        this.resetPasswordForm.value;
      if (newPassword === confirmPassword) {
        this.employeeService
          .resetPassword(this.employeeId, currentPassword, newPassword)
          .subscribe(
            () => {
              this.showSuccess('Password has been reset successfully.');
            },
            (error) => {
              if (error.status === 401) {

                this.showError('Current password is incorrect. Please try again.');
              } else {
                this.showError(
                  'Failed to reset password. Please try again later.'
                );
              }
            }
          );
      } else {
        this.showError('New password and Confirm password must be the same');
      }
    } else {
      this.showError('Reset form values are invalid, please fill out correctly');
    }
  }



  showError(message: string) {
    this.popupType = 'error';
    this.popupIcon = this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor = 'red';
    this.isSuccess = false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor = '#1bbf72';
    this.isSuccess = true;
  }

  closePopup() {
    if (this.popupMessage === 'Your Password has been successfully updated , Thanks!') {
      this.resetPasswordForm.reset();
    }
    if (this.popupMessage === 'Your Details have been successfully updated, Thanks!') {
      this.employeeForm.reset();
    }
    this.popupMessage = null;
  }

  private passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (!newPassword || !confirmPassword) {
      return null;
    }
    return newPassword.value === confirmPassword.value ? null : { mismatch: true };
  }
  validatePassword() {
    const passwordControl = this.resetPasswordForm.get('newPassword');
    if (passwordControl) {
      if (passwordControl.dirty || passwordControl.touched) {
        passwordControl.updateValueAndValidity();
      }
    }
  }

  validateEmail() {
    const email = this.employeeForm.get('employeeEmail')?.value;
    console.log("Validating email:", email);

    this.employeeService.checkDuplicateEmailToUpdate(this.employeeId, email).subscribe(
      (data: boolean) => {
        this.emailStatus = data;
        console.log("validateEmail method result:", data);
      },
      (error: any) => {
        console.error(error);

      }
    );
  }

  validatePhoneNumber() {
    const phoneNumber = this.employeeForm.get('phoneNumber')?.value;
    console.log("Validating phone number:", phoneNumber);

    this.employeeService.checkDuplicatePhoneNumberToUpdate(this.employeeId, phoneNumber).subscribe(
      (data: boolean) => {
        this.phoneNumberStatus = data;
        console.log("validatePhoneNumber method result:", data);
      },
      (error: any) => {
        console.error(error);

      });
  }
}
