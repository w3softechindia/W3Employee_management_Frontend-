import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-settings',
  templateUrl: './instructor-settings.component.html',
  styleUrls: ['./instructor-settings.component.scss']
})
export class InstructorSettingsComponent implements OnInit {
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
  originalValues: any;
  emailStatus:any;
  phoneNumberStatus:any;

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
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z]+$'),
          ,this.noNumbersValidator, 
          this.noDirtyDataValidator()
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z]+$'),
          this.noNumbersValidator,
          this.noDirtyDataValidator()
        ]
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      employeeEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[0-9]+$')
        ]
      ],
    });

    this.resetPasswordForm = this.fb.group(
      {
        currentPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ]
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$')
          ]
        ],
        confirmPassword: [
          '',
          [
            Validators.required
          ]
        ]
      },
      { validators: this.passwordMatchValidator }
    );

    this.employeeId = this.auth.getEmployeeId();
    this.getEmployeeDetails();
  }
  noNumbersValidator(control:any){
    const regex=/^[A-Za-z]*$/;
    return regex.test(control.value)? null : {noNumbers:true}
  }
  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
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
  public hidePassword: boolean[] = [true, true]; // Assuming two password fields
  
  public togglePassword(index: number) {
    console.log(`Toggling password visibility for index: ${index}`);
      this.hidePassword[index] = !this.hidePassword[index];
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
        this.originalValues = { ...this.employee }; // Store original values
        this.employeeForm.patchValue({
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          address: this.employee.address,
          employeeEmail: this.employee.employeeEmail,
          phoneNumber: this.employee.phoneNumber,
        });

        // Monitor form value changes
        this.employeeForm.valueChanges.subscribe(() => {
          this.checkForChanges();
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
          console.log('Instructor details', this.employee);
          this.showSuccess('Profile updated successfully..!!');
          console.log("Updated Successfully");
          // window.location.reload();
        },
        (error: any) => {
          console.log(error);
          this.showError('Failed to update profile..!!');
          console.log("Update Failed");
        }
      );
    } else {
      this.showError('Enter Valid Data To Update');
      console.log(this.employeeForm.errors);
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword === confirmPassword) {
        this.employeeService.resetPassword(this.employeeId, currentPassword, newPassword).subscribe(
          () => {
            this.showSuccess('Password has been reset successfully.');
          },
          (error) => {
            if (error.status === 401) {
              this.showError('Current password is incorrect. Please try again.');
            } else {
              this.showError('Failed to reset password. Please try again later.');
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

  private checkForChanges() {
    const formValues = this.employeeForm.value;
    const isChanged = Object.keys(this.originalValues).some(key => {
      return formValues[key] !== this.originalValues[key];
    });
    // Enable or disable the update button based on whether there are changes
    const updateButton = document.getElementById('updateButton') as HTMLButtonElement;
    if (updateButton) {
      updateButton.disabled = !isChanged;
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
    return newPassword.value === confirmPassword.value
      ? null
      : { mismatch: true };
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
