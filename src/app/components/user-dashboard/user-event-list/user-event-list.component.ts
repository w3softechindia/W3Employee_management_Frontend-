import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { AdminEvent } from 'src/app/Models/AdminEvent';

@Component({
  selector: 'app-user-event-list',
  templateUrl: './user-event-list.component.html',
  styleUrls: ['./user-event-list.component.scss']
})
export class UserEventListComponent implements OnInit{
  events: any[] = [];
  highlightedEventIds: Set<number> = new Set();
  
  constructor(private router: Router,private route:ActivatedRoute,private employeeService: EmployeeService,private datePipe: DatePipe) {}
  
  ngOnInit(): void {
    this.loadSupportRequests();
  }

  loadSupportRequests(): void {
    this.employeeService.getAllEvents().subscribe(
      (events: AdminEvent[]) => {
        this.events = events;
        this.formatDateTimes()
        console.log("total events"+this.events.length);
      },
              (error: any) => {
        console.error('Error fetching events', error);
      }
    );
  }
  
  gotoEvent(eventId: number) {
  this.router.navigate(['user-event-details',eventId]);
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
}


