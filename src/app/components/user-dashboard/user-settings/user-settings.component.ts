import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  employeeForm: FormGroup;

  resetPasswordForm: FormGroup;
  employee: Employee;
  employeeId: string;
  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

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
  }

  updateEmployee() {
    this.employee = this.employeeForm.value;
    this.employeeService
      .updateEmployeeDetails(this.employeeId, this.employee)
      .subscribe(
        (res: any) => {
          this.employee = res;
          console.log('admin details', this.employee);
          alert('profile updated Successfully..!!');
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  
  // Reset password
  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const {currentPassword, newPassword, confirmPassword} =
        this.resetPasswordForm.value;
      if(newPassword===confirmPassword){
        this.employeeService
        .resetPassword(this.employeeId, currentPassword, newPassword)
        .subscribe(
          () => {
            alert('Password has been reset successfully.');
          },
          (error) => {
            alert('Failed to reset password. Please try again later.');
          }
        );
      }else{
        alert('password does not match..!! ')
      }
      
    }
  }
}



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      webEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePassword: ['', Validators.required]
    });
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Perform the update action here
    } else {
      console.log('Form is invalid');
    }
  }
}


