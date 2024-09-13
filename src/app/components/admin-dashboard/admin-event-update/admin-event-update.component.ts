import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { AdminEvent } from 'src/app/Models/AdminEvent';

@Component({
  selector: 'app-admin-event-update',
  templateUrl: './admin-event-update.component.html',
  styleUrls: ['./admin-event-update.component.scss']
})
export class AdminEventUpdateComponent implements OnInit{
  event:AdminEvent;
  eventForm: FormGroup;
  eventId:number;
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
    private router:Router,
    private route:ActivatedRoute,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) { 
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      subject: ['', Validators.required,Validators.minLength(6),Validators.maxLength(30)],
      description: ['', Validators.required],
      dateTime: [new Date(), Validators.required],
      
    });
    this.eventId=this.route.snapshot.params['eventId'];
    this.getEvent(this.eventId);
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
    if (this.popupMessage === 'Updated event successfully') {
      this.router.navigate(['admin-event-list']);
    }
 
    this.popupMessage = null;
  }
  getEvent(eventId:number): void {
  
      this.employeeService.getEventById(eventId).subscribe(
        (data:any) => {
          this.event=data;
          this.eventForm.patchValue({
            subject: this.event.subject,
            description: this.event.description,
            dateTime:this.event.dateTime
            
          
          });
          console.log('Support Request fetched', data);
        },
        (error:any) => {
          console.log('Error fetching support request:', error);
        
        }
      );
    }
    updateEvent(){
      if(!this.eventForm.invalid){
      this.event=this.eventForm.value
      this.employeeService.updateEvent(this.eventId,this.event).subscribe(
        (data:any)=>{
          console.log("updated event successfully",data);
          this.showSuccess("Updated event successfully");
        
        },
        (error:any)=>{
          console.log("error in updating event",error);
          this.showError("Updated event failed");
        }
      );
    }
    else{
      console.log("Please fill form currectly");
      this.showError("Please fill form currectly");
    }
  }
  gotoAllEvents() {
this.router.navigate(['admin-event-list']);
  }
  }

