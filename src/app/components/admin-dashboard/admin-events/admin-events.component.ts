import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit{
  addEventForm: FormGroup;
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
        private authService: AuthService,
        private employeeService: EmployeeService,
        private sanitizer: DomSanitizer
        
      ) { 
        this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
        this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
      }
    
      ngOnInit(): void {
        this.addEventForm = this.fb.group({
         subject: ['', Validators.required,Validators.minLength(6), Validators.maxLength(30), this.noDirtyDataValidator()],
          description: ['', Validators.required,Validators.minLength(6), Validators.maxLength(100)],
          dateTime:['',Validators.required]
                 });
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
        if (this.popupMessage === 'Event added successfully') {
          this.addEventForm.reset();
        }
        this.popupMessage = null;
      }
      noDirtyDataValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
          const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
          return forbidden ? { 'dirtyData': { value: control.value } } : null;
        };
      }
      onSave(): void {
        if (!this.addEventForm.invalid) {
          const newEvent: Event = this.addEventForm.value;
            this.employeeService.addEvent(newEvent).subscribe(
            (data:any) => {
             
              console.log(' Event Created :', data);
              this.showSuccess("Event added successfully");
            
            },
            (error:any) => {
              console.error('Error in creating Event :', error);
           
            this.showError("Adding Event failed try again");
          }
        );
      }
      else{
        console.log("error:",this.addEventForm.errors);
        console.log("Please fill form currectly");
        this.showError("Please fill form currectly");
      }
      }
      gotoAllEvents() {
        this.router.navigate(['/admin-event-list']);
        }
       
    }