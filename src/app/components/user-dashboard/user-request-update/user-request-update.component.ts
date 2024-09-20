import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.supportRequestForm = this.fb.group({
      subject:['',Validators.required,Validators.minLength(4),Validators.maxLength(15)],
      description: ['', Validators.required,Validators.maxLength(10),Validators.maxLength(100)],
      
    });
    this.ticket=this.route.snapshot.params['ticketId'];
    this.getSupportRequest(this.ticket);
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
          console.log("updated request",data);
          this.router.navigate(['user-request-list']);
        },
        (error:any)=>{
          console.log("error in updating request",error);
        }
      );
    }
  }
  gotoAllRequest() {
this.router.navigate(['user-request-list']);
  }
  }


