import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-request-details',
  templateUrl: './user-request-details.component.html',
  styleUrls: ['./user-request-details.component.scss']
})
export class UserRequestDetailsComponent {
  supportRequest:any;
  
  ticketId:number;


  constructor(private fb:FormBuilder, private router:Router,    private datePipe: DatePipe,
    private route: ActivatedRoute,private authService :AuthService,private employeeService: EmployeeService){}
  ngOnInit(): void {
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
gotoAllRequest() {
  this.router.navigate(['user-request-list']);
}



}

