import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-support-request-details',
  templateUrl: './support-request-details.component.html',
  styleUrls: ['./support-request-details.component.scss']
})
export class SupportRequestDetailsComponent implements OnInit{
  supportRequest:any;
  replyMsg:string;
  ticketId:number;
  employeeId:string;
  popupMessage:string | null = null;
  textcolor:string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon:SafeHtml;
  isSuccess:boolean;
  myForm:FormGroup ;

  constructor(private fb:FormBuilder, private router:Router,private datePipe: DatePipe,
    private route: ActivatedRoute,private authService :AuthService,
    private sanitizer: DomSanitizer,private employeeService: EmployeeService){
      this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
      this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
    }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      message: ['',Validators.required] 
    });
   this.ticketId=this.route.snapshot.params['ticketId'];
  this.getSupportRequest(this.ticketId);
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
getSupportRequest(ticketId:number){
  this.employeeService.getSupportRequestById(ticketId).subscribe(
    (data:any)=>{
  this.supportRequest=data;
  if (this.supportRequest && this.supportRequest.dateTime) {
  
    this.supportRequest.dateTime = this.datePipe.transform(this.supportRequest.dateTime, 'dd-MM-yyyy HH:mm:ss');
  }
  console.log(this.supportRequest);
    },
    (error:any)=>{
    console.log("error in fetching supportRequest",error);
   } 
  );
}

addText(text: string) {
  this.myForm.get('message')?.setValue(text);
}
sendMsg() {
this.employeeId=this.supportRequest.postedBy;
if(this.myForm.valid){

  this.replyMsg=this.myForm.value;
  this.employeeService.updateSupportRequest(this.supportRequest.ticketId,this.supportRequest).subscribe(
    (data:any)=>{
      console.log("reply send successfully",this.supportRequest);
      console.log("request updated succesfully",data);
      
      
    },
    (error:any)=>{
      console.log("error in updating request",error);
      
      
    }
  );
  this.employeeService.sendRequestReply(this.supportRequest.ticketId,this.employeeId,this.replyMsg).subscribe(
    (data:any)=>{
      console.log("reply send successfully",data);
      
      this.showSuccess("Reply Message send successfully");
    },
    (error:any)=>{
      console.log("error in sending replyMsg",error);
    }
  );
}
else{
  console.log("invalid data");
  
  this.showError("please fill form currectly");
}
  
}

}

