import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.scss']
})
export class AdminEventListComponent implements OnInit{
  events: any[] = [];
  highlightedEventIds: Set<number> = new Set();
  constructor(private router: Router,private route:ActivatedRoute,private employeeService: EmployeeService,private datePipe: DatePipe) {}
  
  ngOnInit(): void {
    this.loadSupportRequests();
  }

  loadSupportRequests(): void {
    this.employeeService.getAllEvents().subscribe(
      (events: any[]) => {
        this.events = events;
        this.formatDateTimes();
        console.log("total events"+this.events.length);
      },
              (error: any) => {
        console.error('Error fetching events', error);
      }
    );
  }
  gotoEventUpdate(eventId:number){
    console.log('Navigating to event with ID:', eventId);
this.router.navigate(['/admin-event-update',eventId]);
  }
  gotoEvent(eventId: number) {
  this.router.navigate(['admin-event-details',eventId]);
  }
  formatDateTimes(): void {
    this.events.forEach(event => {
      event.dateTime = this.datePipe.transform(event.dateTime, 'dd-MM-yyyy HH:mm:ss');
    });
  }

  isHighlighting(dateTime: string): boolean {
    const eventDate = new Date(dateTime);
    const now = new Date();
    return eventDate > now && !this.highlightedEventIds.has(eventDate.getTime());
  }
  gotoEventCreate(){
    this.router.navigate(['/admin-events']);
  }
}




