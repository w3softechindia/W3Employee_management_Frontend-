import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder,private employeeService:EmployeeService) {
    this.requestForm = this.fb.group({
      subject: ['', Validators.required,Validators.minLength(6),Validators.maxLength(20)],
      description: ['', Validators.required,Validators.minLength(6),Validators.maxLength(100)]
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.request=this.requestForm.value;
    
      this.employeeService.addSupportRequest(this.request).subscribe(
        (data:any)=>{
          console.log("request send successfully",this.request);
          alert("request send successfully");
          
        },
        (error:any)=>{
          console.log("error in request sendind",error);
          alert("invalid data");
        }
      );
      
    }
  }

}
