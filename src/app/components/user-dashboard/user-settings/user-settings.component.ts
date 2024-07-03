import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl:'./user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
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
  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');

    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      webEmail: ['', [Validators.required, Validators.email]],
      webMailPassword: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this.employeeId = this.auth.getEmployeeId();
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
        this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
          (res: Employee) => {
            this.employee = res;
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
    this.employee = this.employeeForm.value;
    this.employeeService.updateEmployeeDetails(this.employeeId, this.employee).subscribe(
      (res: any) => {
        this.employee = res;
        console.log('admin details', this.employee);
        this.showSuccess('Profile updated successfully..!!');
      },
      (error: any) => {
        console.log(error);
        this.showError('Failed to update profile..!!');
      }
    );
  }

  // Reset password
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
              // alert('Password has been reset successfully.');
            },
            (error) => {
              this.showError(
                'Failed to reset password. Please try again later.'
              );
              // alert('Failed to reset password. Please try again later.');
            }
          );
      } else {
        this.showError('New password and Confirm password Must be Same');
      }
    } else {
      this.showError('Reset form Values are invalid please Fill Correctly');
    }
  }

  showError(message: string) {
    this.popupType = 'error';
    // this.popupIcon = 'assets/error-icon.png';
    this.popupIcon = this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor = 'red';
    this.isSuccess = false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    //this.popupIcon = 'assets/success-icon.png';
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor = '#1bbf72';
    this.isSuccess = true;
  }
  closePopup() {
    if (
      this.popupMessage ===
      'Your Password has been successfully updated , Thanks!'
    ) {
      this.resetPasswordForm.reset();
    }
    if (
      this.popupMessage ===
      'Your Details have been sucessfully updated, Thanks!'
    ) {
      this.employeeForm.reset();
    }
    this.popupMessage = null;
  }
}

