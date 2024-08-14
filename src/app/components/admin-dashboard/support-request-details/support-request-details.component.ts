import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  myForm:FormGroup ;
  constructor(private fb:FormBuilder, private router:Router,private datePipe: DatePipe,
    private route: ActivatedRoute,private authService :AuthService,private employeeService: EmployeeService){}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      textInput: ['',Validators.required] // Initialize with an empty string or any default value
    });
   this.ticketId=this.route.snapshot.params['ticketId'];
  this.getSupportRequest(this.ticketId);
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
  this.myForm.get('textInput')?.setValue(text);
}
sendMsg() {
this.employeeId=this.supportRequest.postedBy;
if(this.myForm.valid){

  this.replyMsg=this.myForm.value;
  this.employeeService.updateSupportRequest(this.supportRequest.ticketId,this.supportRequest).subscribe(
    (data:any)=>{
      console.log("reply send successfully",this.supportRequest);
      console.log("request updated succesfully",data);
      alert("request updated successfully");
    },
    (error:any)=>{
      console.log("error in updating request",error);
      
    }
  );
  this.employeeService.sendRequestReply(this.supportRequest.ticketId,this.employeeId,this.replyMsg).subscribe(
    (data:any)=>{
      console.log("reply send successfully",data);
      alert("reply Message send successfully");
    },
    (error:any)=>{
      console.log("error in sending replyMsg",error);
    }
  );
}
else{
  console.log();
  alert("please fill form currectly");
}
  
}

}

