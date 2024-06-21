import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  employee:Employee=new Employee();
  roleName:string;
  password:string;
  confirmPassword:string;
  popupMessage:string | null = null;
  textcolor:string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon:SafeHtml;
  isSuccess:boolean;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
    
  }

  ngOnInit(): void {
    console.log('RegisterPageComponent initialized');
    this.registerForm = this.fb.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      webMail: ['', [Validators.required]],
      webMailPassword: ['', Validators.required],
      employeeEmail: ['', [Validators.required]],
      employeePassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      role: ['', Validators.required],
      confirmPassword:['',Validators.required]
    });
  }
   
  public hidePassword: boolean[] = [true];
  public togglePassword(index: number) {
    this.hidePassword[index] = !this.hidePassword[index];
  }
  passwordMatchValidator(form: FormGroup) {
    return form.controls['employeePassword'].value === form.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  
  showError(message: string) {
    this.popupType = 'error';
   // this.popupIcon = 'assets/error-icon.png';
   this.popupIcon=this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor= 'red';
    this.isSuccess=false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    //this.popupIcon = 'assets/success-icon.png';
    this.popupIcon=this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
   this.textcolor= '#1bbf72';
   this.isSuccess=true;
  }
  closePopup() {
    this.popupMessage = null;
  }
  
  addEmployee() {
    if(this.registerForm.valid){
      this.password=this.registerForm.value.employeePassword;
      this.confirmPassword=this.registerForm.value.confirmPassword;
      
      
      if(this.password===this.confirmPassword){
      const employee = this.registerForm.value;
      const password=this.registerForm.value.employeePassword;
      const cPassword=this.registerForm.value.confirmPassword;
      console.log(employee);
      const roleName = employee.role;
      console.log(roleName);
      this.employeeService.addEmployee(employee, roleName).subscribe(
        (data) => {
      
          this.showSuccess("Employee Registered successfully, Thanks!");
          console.log('Employee Registered success..!!!', data);
          
          this.registerForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  else{
    
      this.showError("NewPassword and  ConfirmPassword must be same!");
 }
}  
  else{
    
    this.showError("Please fill the RegisterForm with currect values");
    console.log(this.registerForm.errors);
  }
    }
    validatePassword() {
      const passwordControl = this.registerForm.get('employeePassword');
      if (passwordControl) {
        if (passwordControl.dirty || passwordControl.touched) {
          passwordControl.updateValueAndValidity();
        }
      }
    }
    
  get formControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  }
  


interface Role {
  roleName: string;
}
