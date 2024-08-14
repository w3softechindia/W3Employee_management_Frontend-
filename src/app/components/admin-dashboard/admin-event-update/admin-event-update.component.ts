import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route:ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      subject: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: [new Date(), Validators.required],
      
    });
    this.eventId=this.route.snapshot.params['eventId'];
    this.getEvent(this.eventId);
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
          console.error('Error fetching support request:', error);
        
        }
      );
    }
    updateEvent(){
      if(this.eventForm.valid){
      this.event=this.eventForm.value
      this.employeeService.updateEvent(this.eventId,this.event).subscribe(
        (data:any)=>{
          console.log("updated event successfully",data);
          alert("updated event successfully");
          this.router.navigate(['admin-event-list']);
        },
        (error:any)=>{
          console.log("error in updating event",error);
          alert("updated event failed");
        }
      );
    }
    else{
      console.log("Please fill form currectly");
      alert("invalid data entered");
    }
  }
  gotoAllEvents() {
this.router.navigate(['admin-event-list']);
  }
  }

