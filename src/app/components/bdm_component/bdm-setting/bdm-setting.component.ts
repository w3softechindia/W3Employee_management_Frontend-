import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { BdmClient } from 'src/app/Models/bdmClient';

@Component({
  selector: 'app-bdm-setting',
  templateUrl: './bdm-setting.component.html',
  styleUrls: ['./bdm-setting.component.scss']
})
export class BdmSettingComponent implements OnInit {
  clientForm: FormGroup;
  resetPasswordForm: FormGroup;
  client: BdmClient;
  companyId: string;
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  originalValues: any;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private employeeService : EmployeeService
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(4)]],
      companyStrength: ['', [Validators.required]],
      companyRole: ['', [Validators.required]],
      portalLink: ['', [Validators.required]],
      companyLink: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      location: ['', [Validators.required]],
      experience : ['', [Validators.required]],
      jobDescription : ['', [Validators.required]],
    });

    this.resetPasswordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*\\d).+$')]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );

    this.companyId = this.auth.getCompanyId(); // Adjust based on how you retrieve companyId
    this.getClientDetails();
  }

  getClientDetails() {
    this.employeeService.getClientDetails(this.companyId).subscribe(
      (res: BdmClient) => {
        this.client = res;
        this.originalValues = { ...this.client }; // Store original values
        this.clientForm.patchValue({
          companyName: this.client.companyName,
          companyStrength: this.client.companyStrength,
          companyRole: this.client.companyRole,
          portalLink: this.client.portalLink,
          companyLink: this.client.companyLink,
          contactNumber: this.client.contactNumber,
          location: this.client.location,
          experience: this.client.experience,
          jobDescription:this.client.jobDescription
          
        });

        // Monitor form value changes
        this.clientForm.valueChanges.subscribe(() => {
          this.checkForChanges();
        });
      },
      (error: any) => {
        console.log(error);
        this.showError('Failed to load client details.');
      }
    );
  }

  updateClient() {
    if (this.clientForm.valid) {
      this.client = this.clientForm.value;
      this.employeeService.updateClientDetails(this.companyId, this.client).subscribe(
        (res: any) => {
          this.client = res;
          this.showSuccess('Client profile updated successfully.');
        },
        (error: any) => {
          console.log(error);
          this.showError('Failed to update client profile.');
        }
      );
    } else {
      this.showError('Please provide valid data to update.');
    }
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword === confirmPassword) {
        this.employeeService.resetClientPassword(this.companyId, currentPassword, newPassword).subscribe(
          () => {
            this.showSuccess('Password has been reset successfully.');
          },
          (error) => {
            if (error.status === 401) {
              this.showError('Current password is incorrect.');
            } else {
              this.showError('Failed to reset password. Try again later.');
            }
          }
        );
      } else {
        this.showError('New password and confirmation password must match.');
      }
    } else {
      this.showError('Reset password form is invalid.');
    }
  }

  private checkForChanges() {
    const formValues = this.clientForm.value;
    const isChanged = Object.keys(this.originalValues).some(key => formValues[key] !== this.originalValues[key]);
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
    this.popupMessage = null;
  }

  private passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (!newPassword || !confirmPassword) return null;
    return newPassword.value === confirmPassword.value ? null : { mismatch: true };
  }
}
