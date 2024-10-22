import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
      subject:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20),this.noDirtyDataValidator()]],
      description: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(100),this.noDirtyDataValidator()]],
      
    });
    this.supportRequestForm.get('description')?.valueChanges.subscribe(value => {
      console.log('Description Value Changed:', value);
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
      this.router.navigate(['user-request-list']);

    }
   
    this.popupMessage = null;
  }
  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
  }
  getSupportRequest(requestId:number): void {
        console.log("get by ticketId :",requestId); 
      this.employeeService.getSupportRequestById(requestId).subscribe(
        (data:any) => {
          this.supportRequest=data;
          console.log('Support Request fetched', data);
          this.supportRequestForm.patchValue({
            subject:this.supportRequest.subject,
            description: this.supportRequest.description,
            
          
          });
        },
        (error:any) => {
          console.error('Error fetching support request:', error);
        
        }
      );
    }
  
  updateSupportRequest() {
      
    if (!this.supportRequestForm.invalid) {
        // Use form values to create the support request object
        this.supportRequest = this.supportRequestForm.value;
        console.log("Form Values:", this.supportRequestForm.value); 
        console.log("update request is :",this.supportRequest);
        this.employeeService.updateSupportRequest(this.ticket, this.supportRequest).subscribe(
            (data: any) => {
                console.log("Updated request successfully", data);
                this.showSuccess("Updated request successfully");
            },
            (error: any) => {
                console.log("Error in updating request", error);
                this.showError("Updating request failed");
            }
        );
    } else {
      console.log("Form is invalid:", this.supportRequestForm.errors);
        console.log("Please fill the form correctly");
        this.showError("Please fill the form correctly");
    }
}

  gotoAllRequest() {
this.router.navigate(['user-request-list']);
  }
  }


