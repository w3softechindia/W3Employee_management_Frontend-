import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { SupportRequest } from 'src/app/Models/SupportRequest';

@Component({
  selector: 'app-user-create-request',
  templateUrl: './user-create-request.component.html',
  styleUrls: ['./user-create-request.component.scss']
})
export class UserCreateRequestComponent implements OnInit {
  supportRequestForm: FormGroup;
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.supportRequestForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), this.noDirtyDataValidator()]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],


    });
  }
  activeButton: string = 'userRequest'; // Default active button

  setActiveButton(buttonName: string): void {
    this.activeButton = buttonName;
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
    if (this.popupMessage === 'request send successfully') {
      this.supportRequestForm.reset();
    }

    this.popupMessage = null;
  }
  gotoAllRequest() {
    this.router.navigate(['/user-request-list']);
  }
  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
  }
  onSubmit(): void {
    if (this.supportRequestForm.invalid) {
      this.showError("Please fill in all mandatory fields before submitting.");
      return;
    }

    const newRequest: SupportRequest = this.supportRequestForm.value;
    newRequest.postedBy = this.authService.getEmployeeId();
    this.employeeService.addSupportRequest(newRequest).subscribe(
      (data: any) => {
        console.log('Request Created:', data);
        this.showSuccess("Request sent successfully");
      },
      (error: any) => {
        console.error('Error in creating support request:', error);
        this.showError("Request send failed");
      }
    );
  }
}


