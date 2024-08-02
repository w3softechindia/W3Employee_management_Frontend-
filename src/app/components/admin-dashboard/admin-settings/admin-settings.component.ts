import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  employee!: Employee;
  employee1!: Employee;
  employeeId1!: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  password: string;
  emailStatus: boolean = false;
  phoneNumberStatus: boolean = false;
  
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  updateForm: FormGroup = new FormGroup({
    employeeId: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    webMail: new FormControl(),
    webMailPassword: new FormControl(),
    employeeEmail: new FormControl(),
    employeePassword: new FormControl(),
    phoneNumber: new FormControl(),
    roles: new FormControl()

  });
  resetPasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(),
    newPassword: new FormControl(),
    confirmPassword: new FormControl()


  });
  constructor(private router: Router, private sanitizer: DomSanitizer, private employeeService: EmployeeService, private authService: AuthService, private fb: FormBuilder) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');

    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
  }



  ngOnInit(): void {
    console.log('RegisterPageComponent initialized');
    this.updateForm = this.fb.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],


      employeeEmail: ['', [Validators.required, Validators.email]],

      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+91\d{10}$/)]],


    },);
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(5)]],
      newPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator })

    this.employeeId1 = this.authService.getEmployeeId();
    this.getAdminDetails(this.employeeId1);

  }


  public hidePassword: boolean[] = [true];

  public togglePassword(index: number) {
    this.hidePassword[index] = !this.hidePassword[index];
  }
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
  onEmployeeIdKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    // Prevent backspace if the cursor is before or on 'W3S'
    if (event.key === 'Backspace' && input.selectionStart !== null && input.selectionStart <= 3) {
      event.preventDefault();
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
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor = '#1bbf72';
    this.isSuccess = true;
  }
  closePopup() {
    if (this.popupMessage === "Your Password has been successfully updated , Thanks!") {
      this.resetPasswordForm.reset();
      this.router.navigate(['/login']);
    }
    if (this.popupMessage === "Your Details have been sucessfully updated, Thanks!") {
      this.updateForm.reset();

    }
    this.popupMessage = null;


  }

  getAdminDetails(employeeId: string) {
    this.employeeService.getAdminDetails(this.employeeId1).subscribe(
      (res: any) => {
        this.employee1 = res;
        console.log("admin getting details", this.employee1.employeeId);
        const formattedPhoneNumber = `+${this.employee1.phoneNumber}`;
        this.updateForm.patchValue({ employeeId: this.employeeId1 });

        this.updateForm.patchValue({
          employeeId: this.employeeId1,
          firstName: this.employee1.firstName,
          lastName: this.employee1.lastName,
          address: this.employee1.address,
          webMail: this.employee1.webMail,

          employeeEmail: this.employee1.employeeEmail,

          phoneNumber: formattedPhoneNumber,
          roles: this.employee1.roles
        });

      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  updateAdminDetails() {

    if (this.updateForm.valid) {
      this.employee = this.updateForm.value;
      console.log(this.employeeId1);
      console.log("goto update details", this.employee);
      this.employeeService.updateAdminDetails(this.employeeId1, this.employee).subscribe(
        (res: any) => {
          this.employee = res;


          this.showSuccess("Profile has been sucessfully updated, Thanks!");
          console.log("admin updated details", this.employee);

          this.updateForm.reset();

        },
        (error: any) => {
          console.log(error);
        }
      )
    } else {

      this.showError("Fill the UpdateForm with currect values");
      console.log("Form is invalid", this.updateForm.errors);

    }

  }
  resetPassword() {

    if (this.resetPasswordForm.valid) {
      this.currentPassword = this.resetPasswordForm.value.currentPassword;
      this.newPassword = this.resetPasswordForm.value.newPassword;
      this.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      const { currentPassword, newPassword, confirmPassword } =
        this.resetPasswordForm.value;
      if (this.newPassword === this.confirmPassword) {
        this.employeeService.resetPassword(this.employeeId1, currentPassword, newPassword).subscribe(
          (res: any) => {

            this.showSuccess("Your Password has been successfully updated , Thanks!");
            console.log(res);
            console.log("password updated details", newPassword);
          

          },
          (error: any) => {
            console.log(error);

            this.showError("Sorry , Your entered Password is invalid. ");
          }
        );

      }
      else {

        this.showError("NewPassword and ConfirmPassword are must be same.");
        console.log("NewPassword and ConfirmPassword must be same");


      }
    }
    else {
      console.log("ResetForm is invalid");

      this.showError("Fill the ResetForm currectly.");

    }
  }


  validatePassword() {
    const passwordControl = this.resetPasswordForm.get('newPassword');
    if (passwordControl) {
      if (passwordControl.dirty || passwordControl.touched) {
        passwordControl.updateValueAndValidity();
      }
    }
  }
  validateEmail(): boolean {
    const email = this.updateForm.get('employeeEmail')?.value;
    let result = false;
    this.employeeService.checkDuplicateEmailToUpdate(this.employeeId1, email).subscribe(
      (data: any) => {
        result = data;
        this.emailStatus = data;
        console.log("validateEmail method", result);
        return result;
      },
      (error: any) => {
        console.log(error);
      }
    );

    return result;
  }
  validatePhoneNumber(): boolean {
    const phoneNumber = this.updateForm.get('phoneNumber')?.value;
    let result = false;
    this.employeeService.checkDuplicatePhoneNumberToUpdate(this.employeeId1, phoneNumber).subscribe(
      (data: any) => {
        result = data;
        this.phoneNumberStatus = data;
        console.log("validatePhoneNumber method", result);
        return result;
      },
      (error: any) => {
        console.log(error);
      }
    );

    return result;
  }

}
