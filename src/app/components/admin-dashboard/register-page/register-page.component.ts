import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  employee:Employee=new Employee();
  roleName:string;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
   
  }

  ngOnInit(): void {
    console.log('RegisterPageComponent initialized');
    this.registerForm = this.fb.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      webMail: ['', [Validators.required, Validators.email]],
      webMailPassword: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      role: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      confirmPassword:[Validators.required]
    });
  }


  public hidePassword: boolean[] = [true];

  public togglePassword(index: number) {
    this.hidePassword[index] = !this.hidePassword[index];
  }


  validatePassword() {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl) {
      if (passwordControl.dirty || passwordControl.touched) {
        passwordControl.updateValueAndValidity();
      }
    }
  }

  // Getter method to safely access form controls in the template
  get formControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }


  addEmployee() {
      const employee = this.registerForm.value;
      const password=this.registerForm.value.employeePassword;
      const cPassword=this.registerForm.value.confirmPassword;
      console.log(employee);
      const roleName = employee.role;
      console.log(roleName);
      if(password === cPassword){
        this.employeeService.addEmployee(employee, roleName).subscribe(
          (data) => {
            console.log('Employee Registered success..!!!', data);
            alert("Employee Registration Success");
          },
          (error) => {
            alert("Registration not successful...!!")
            console.log(error);
          }
        );
      }else{
        alert("Passwords not matched...!!!")
      }
  }

}


