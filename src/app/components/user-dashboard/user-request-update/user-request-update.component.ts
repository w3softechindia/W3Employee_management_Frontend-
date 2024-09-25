import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { SupportRequest } from 'src/app/Models/SupportRequest';

@Component({
  selector: 'app-user-request-update',
  templateUrl: './user-request-update.component.html',
  styleUrls: ['./user-request-update.component.scss']
})
export class UserRequestUpdateComponent implements OnInit{
  supportRequest:SupportRequest;
  supportRequestForm: FormGroup;
  ticket:number;
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
    private router:Router,
    private route:ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.supportRequestForm = this.fb.group({
      subject:['',Validators.required,Validators.minLength(6),Validators.maxLength(20)],
      description: ['', Validators.required,Validators.minLength(6),Validators.maxLength(100)],
      
    });
    this.ticket=this.route.snapshot.params['ticketId'];
    this.getSupportRequest(this.ticket);
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
    if (this.popupMessage === 'updated request sucessfully') {
      this.supportRequestForm.reset();
    }
   
    this.popupMessage = null;
  }
  getSupportRequest(requestId:number): void {
        console.log("get by ticketId :",requestId); 
      this.employeeService.getSupportRequestById(requestId).subscribe(
        (data:any) => {
          this.supportRequest=data;
          this.supportRequestForm.patchValue({
            subject:this.supportRequest.subject,
            description: this.supportRequest.description,
            
          
          });
          console.log('Support Request fetched', data);
        },
        (error:any) => {
          console.error('Error fetching support request:', error);
        
        }
      );
    }
    updateSupportRequest(){
      if(this.supportRequestForm.valid){
      this.supportRequest=this.supportRequestForm.value
      this.employeeService.updateSupportRequest(this.ticket,this.supportRequest).subscribe(
        (data:any)=>{
          console.log("updated request sucessfully",data);
          this.showSuccess("updated request sucessfully");
          this.router.navigate(['user-request-list']);
        },
        (error:any)=>{
          console.log("error in updating request",error);
          this.showError(" updating request failed");
        }
      );
    }
  }
  gotoAllRequest() {
this.router.navigate(['user-request-list']);
  }
  }


