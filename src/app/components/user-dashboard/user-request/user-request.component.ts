import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/employee.service';
import { SupportRequest } from 'src/app/Models/SupportRequest';


@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent {
  request: SupportRequest;
  requestForm: FormGroup;
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  constructor(private fb: FormBuilder,private employeeService:EmployeeService) {
    this.requestForm = this.fb.group({
      subject: ['', Validators.required,Validators.minLength(6),Validators.maxLength(50)],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.request=this.requestForm.value;
    
      this.employeeService.addSupportRequest(this.request).subscribe(
        (data:any)=>{
          console.log("request send successfully",this.request);
          
          this.showSuccess("request send successfully");
          
        },
        (error:any)=>{
          console.log("error in request sendind",error);
          this.showError("request send failed");
          
        }
      );
      
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
    if (this.popupMessage === 'request send successfully') {
      this.requestForm.reset();
    }
   
    this.popupMessage = null;
  }
}
