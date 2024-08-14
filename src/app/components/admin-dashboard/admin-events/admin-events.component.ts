import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  constructor(
        private fb: FormBuilder,
        private router:Router,
        private authService: AuthService,
        private employeeService: EmployeeService,
        
        
      ) { }
    
      ngOnInit(): void {
        this.addEventForm = this.fb.group({
         subject: ['', Validators.required],
          description: ['', Validators.required],
          dateTime:['',Validators.required]
                 });
      }
    
      onSave(): void {
        if (this.addEventForm.valid) {
          const newEvent: Event = this.addEventForm.value;
            this.employeeService.addEvent(newEvent).subscribe(
            (data:any) => {
              alert("Event added successfully");
              console.log(' Event Created :', data);
            
            },
            (error:any) => {
              console.error('Error in creating Event :', error);
            alert("adding Event failed");
          }
        );
      }
      else{
        console.log("Please fill form currectly");
        alert("invalid data entered");
      }
      }
      gotoAllEvents() {
        this.router.navigate(['/admin-event-list']);
        }
       
    }