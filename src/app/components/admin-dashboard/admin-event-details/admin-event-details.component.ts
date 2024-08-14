import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent implements OnInit{
  event:any;
  
  eventId:number;
  
  constructor(private router: Router,private route :ActivatedRoute, private datePipe: DatePipe,
    private authService :AuthService,private employeeService: EmployeeService){}
  ngOnInit(): void {
  this.eventId=this.route.snapshot.params['eventId'];
  this.getEvent(this.eventId);
}
getEvent(eventId:number){
  this.employeeService.getEventById(eventId).subscribe(
    (data:any)=>{
  this.event=data;
  if (this.event && this.event.dateTime) {
  
    this.event.dateTime = this.datePipe.transform(this.event.dateTime, 'dd-MM-yyyy HH:mm:ss');
  }
  console.log(this.event);
    },
    (error:any)=>{
    console.log("error in fetching event",error);
   } 
  );
}
gotoAllEvents() {
  this.router.navigate(['admin-event-list']);
    }


}

