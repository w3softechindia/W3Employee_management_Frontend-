import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.scss']
})
export class AdminEventListComponent implements OnInit{
  events: any[] = [];
  event:any;
  tooltipEvent: any = null;
  tooltipTop: number = 0;
  tooltipLeft: number = 0;
  highlightedEventIds: Set<number> = new Set();
  activeButton: string = 'allEvents';
  constructor(private router: Router,private route:ActivatedRoute,private employeeService: EmployeeService,private datePipe: DatePipe) {}
  
  ngOnInit(): void {
    this.loadSupportRequests();
    this.gotoAllEvents();
  }

  showTooltip(event: any, mouseEvent: MouseEvent) {
    this.tooltipEvent = event;

    // Calculate tooltip position relative to the mouse cursor
    this.tooltipTop = mouseEvent.clientY + 10; // 10px below the cursor
    this.tooltipLeft = mouseEvent.clientX + 10; // 10px to the right of the cursor

    // Update tooltip position and display it
    const tooltipElement = document.querySelector('.description-box') as HTMLElement;
    if (tooltipElement) {
      tooltipElement.style.top = `${this.tooltipTop}px`;
      tooltipElement.style.left = `${this.tooltipLeft}px`;
      tooltipElement.style.display = 'block';
    }
  }

  hideTooltip() {
    this.tooltipEvent = null;

    // Hide tooltip
    const tooltipElement = document.querySelector('.description-box') as HTMLElement;
    if (tooltipElement) {
      tooltipElement.style.display = 'none';
    }
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
    this.activeButton = 'allEvents';
    this.router.navigate(['/admin-event-list']);
  }
 
  gotoEventCreate(){
    this.activeButton = 'addEvent';
    this.router.navigate(['/admin-events']);
  }
  setActiveButton(button: string) {
    this.activeButton = button;
  }



  fetchAndShowEvent(eventId: number): void {
    this.employeeService.getEventById(eventId).subscribe(
      (data: any) => {
        this.event = data;

        if (this.event && this.event.dateTime) {
          this.event.dateTime = this.datePipe.transform(this.event.dateTime, 'dd-MM-yyyy HH:mm:ss');
        }

        this.showEventDetails();
      },
      (error: any) => {
        console.error("Error in fetching event", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch event details!',
        });
      }
    );
  }

  
  showEventDetails(): void {
    if (this.event) {
      Swal.fire({
        title: `<h3 style="background-color: #4caf50; color: white;padding: 10px; border-radius: 5px; margin: 0;">Event Details</h3>`,
        html: `
          <p><b>Subject:</b> ${this.event.subject}</p>
          <p><b>Date and Time:</b> ${this.event.dateTime}</p>
          <p><b>Highlights:</b> ${this.event.highlights || 'No highlights available'}</p>
          <p><b>Description:</b> ${this.event.description || 'No description available'}</p>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Close',
        showCloseButton: true, 
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'custom-popup', 
        },
        didOpen: () => {
          // Apply custom styles to the title and remove padding from the title div
          const swalTitle = document.querySelector('.swal2-title');
          if (swalTitle) {
            swalTitle.setAttribute('style', 'padding: 5px; background-color: #4caf50; color: white; margin-bottom:15px;  text-align: center;');
          }
  
          // Apply inline styles after the modal has opened to remove padding from the body
          const modalBody = document.querySelector('.swal2-html-container');
          if (modalBody) {
            modalBody.setAttribute('style', 'padding: 0 !important; margin: 0 !important;');
          }
        },
      });
    }
  }
  
}




