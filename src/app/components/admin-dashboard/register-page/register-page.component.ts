import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  employeeIdStatus:boolean=false;
  emailStatus:boolean=false;
  webMailStatus:boolean=false;
  phoneNumberStatus:boolean=false;

  
  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
    
  }
  
  
  ngOnInit(): void {
  
    
        console.log('RegisterPageComponent initialized');
    this.registerForm = this.fb.group({
      employeeId: ['W3S', [Validators.required, Validators.pattern(/^W3S\d{4}$/)]],

      firstName: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(20),this.noNumbersValidator]],

      lastName: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(20),this.noNumbersValidator]],


      address: ['', Validators.required],
      webMail: ['', [Validators.required]],
      webMailPassword: ['', Validators.required],
      employeeEmail:  ['', [Validators.required, Validators.email]],     
      employeePassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      phoneNumber: ['+91', [Validators.required, Validators.pattern(/^\+91\d{10}$/)]],
      dateOfJoin:['',Validators.required],
      role: ['', Validators.required],
      confirmPassword:['',Validators.required]
    }, { validator: this.passwordMatchValidator });
 
  }
  

  onEmployeeIdInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Ensure "W3S" remains static
    if (!value.startsWith('W3S')) {
      value = 'W3S' + value.replace(/^W3S/, '');
    }

    // Limit the input to 'W3S' followed by 4 digits
    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    input.value = value;
    this.registerForm.get('employeeId')?.setValue(value, { emitEvent: false });
  }

  onEmployeeIdKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    // Prevent backspace if the cursor is before or on 'W3S'
    if (event.key === 'Backspace' && input.selectionStart !== null && input.selectionStart <= 3) {
      event.preventDefault();
    }
  }
  

  onPhoneNumberInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
  
    // Ensure the value starts with +91
    if (!value.startsWith('+91')) {
      value = '+91' + value.replace(/^\+91/, '');
    }
  
    // Restrict the length to 13 characters (+91 and 10 digits)
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
  
    input.value = value;
    this.registerForm.get('phoneNumber')?.setValue(value, { emitEvent: false });
  }
  
  onPhoneNumberKeydown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
  
   
    if (event.key === 'Backspace' && input.selectionStart !== null && input.selectionStart <= 3) {
      event.preventDefault();
    }
  }
  
  public hidePassword: boolean[] = [true];
  public togglePassword(index: number) {
    this.hidePassword[index] = !this.hidePassword[index];
  }
  

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('employeePassword');
    const confirmPassword = form.get('confirmPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }
  
  showError(message: string) {
    this.popupType = 'error';
   this.popupIcon=this.errorIcon;
   this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor= 'red';
    this.isSuccess=false;
  }
  
  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon=this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor= '#1bbf72';
    this.isSuccess=true;
  }
  closePopup() {
    this.popupMessage = null;
  }
  noNumbersValidator(control:any){
    const regex=/^[A-Za-z]*$/;
    return regex.test(control.value)? null : {noNumbers:true}
  }
  addEmployee() {
    console.log("is formvalid",this.registerForm.valid);
  
    if ( !this.emailStatus && !this.webMailStatus && !this.phoneNumberStatus) {
      const employee = this.registerForm.value;
      const password = this.registerForm.value.employeePassword;
      const cPassword = this.registerForm.value.confirmPassword;
      console.log(employee);
      const roleName = employee.role;
      console.log(roleName);
      this.employeeService.addEmployee(employee, roleName).subscribe(
        (data) => {
          this.showSuccess("Employee Registered successfully, Thanks!");
          console.log('Employee Registered success..!!!', data.employeeId);
          this.registerForm.reset();
         
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("emailstatus",this.emailStatus);
      console.log(this.registerForm.errors);
      this.showError("Please fill the RegisterForm with correct values");
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
    validateEmployeeId():boolean {
      const employeeId=this.registerForm?.get('employeeId')?.value;
      let result=false;
      if(employeeId!=null){ 
      
      this.employeeService.checkDuplicateEmployeeId(employeeId).subscribe(
          (data:any)=>{
            result=data;
            this.employeeIdStatus=data;
            console.log("validateEmployeeId method",result);
            console.log("errors:",this.registerForm.get('employeeId')?.errors);
            return result;
          },
        (error:any)=>{
          console.log(error);
        }
        );
        
      }else{
        console.log("employeeID",employeeId);
      }
        return result;
    }
      validateEmail():boolean{
               
        const email=this.registerForm?.get('employeeEmail')?.value;
        let result=false;
        if(email!=null){ 
        
        this.employeeService.checkDuplicateEmail(email).subscribe(
            (data:any)=>{
              result=data;
              this.emailStatus=data;
              console.log("validateEmail method",result);
              console.log("errors:",this.registerForm.get('email')?.errors);
              return result;
            },
          (error:any)=>{
            console.log(error);
          }
          );
          
        }else{
          console.log("email",email);
        }
          return result;
      }
      
      validateWebMail():boolean{
        let result=false; 
        const webMail=this.registerForm?.get('webMail')?.value;
        console.log("webmail",webMail);
        if(webMail!=null){
        this.employeeService.checkDuplicateWebMail(webMail).subscribe(
            (data:any)=>{
              result=data;
              this.webMailStatus=data;
              console.log("validateWebMail method",result);
              return result;
            },
          (error:any)=>{
            console.log(error);
          }
          );
          this.webMailStatus=result;
        }
          return result;
        
      }
      validatePhoneNumber():boolean{
        const phoneNumber=this.registerForm?.get('phoneNumber')?.value;
        let result=false; 
        if(phoneNumber!=null){
        this.employeeService.checkDuplicatePhoneNumber(phoneNumber).subscribe(
            (data:any)=>{
              result=data;
              this.phoneNumberStatus=data;
              console.log("validatePhoneNumber method",result);
              return result;
            },
          (error:any)=>{
            console.log(error);
          }
          );
          this.phoneNumberStatus=result;
        }
          return result;
      }
      
       
  get formControls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  }



interface Role {
  roleName: string;
}
function Directive(arg0: { selector: string; }): (target: typeof RegisterPageComponent) => void | typeof RegisterPageComponent {
  throw new Error('Function not implemented.');
}
