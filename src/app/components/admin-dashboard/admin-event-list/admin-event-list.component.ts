import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.scss']
})
export class AdminEventListComponent implements OnInit {
  events: any[] = [];
  event: any;
  eventForm: FormGroup;
  addEventForm: FormGroup;
  eventId: number;
  tooltipEvent: any = null;
  tooltipTop: number = 0;
  tooltipLeft: number = 0;
  highlightedEventIds: Set<number> = new Set();
  activeButton: string = 'allEvents';
  isModalOpen: boolean = false;
  minDateTime: string = '';
  popupMessage: string | null = null;
  textcolor: string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;



  constructor(private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
  }

  ngOnInit(): void {

    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
    this.addEventForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noDirtyDataValidator()]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      dateTime: ['', Validators.required]
    });

    this.eventForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.noDirtyDataValidator()]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      dateTime: [new Date(), Validators.required],

    });


    this.loadSupportRequests();
    this.gotoAllEvents();
  }

  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
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
        console.log("total events" + this.events.length);
      },
      (error: any) => {
        console.error('Error fetching events', error);
      }
    );
  }
  //   gotoEventUpdate(eventId:number){
  //     console.log('Navigating to event with ID:', eventId);
  // this.router.navigate(['/admin-event-update',eventId]);
  //   }

  // openEditModal(eventId: number): void {
  //   this.eventId = eventId; // Set eventId here
  //   const event = this.events.find(e => e.eventId === eventId);
  //    this.isModalOpen = true;
  //   if (event) {
  //     this.eventForm.setValue({
  //       subject: event.subject || '', 
  //       description: event.description || '',
  //       dateTime: event.dateTime || ''
  //     });

  //   }
  // }

  openEditModal(eventId: number): void {
    this.eventId = eventId; // Set eventId here
    const event = this.events.find(e => e.eventId === eventId);

    if (event) {
      // Convert the string date "18-12-2024 16:01:00" into a Date object
      const dateParts = event.dateTime.split(' ');
      const dateArr = dateParts[0].split('-');
      const timeArr = dateParts[1].split(':');

      const formattedDate = new Date(
        `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}T${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
      );

      // Format the dateTime to the correct format (yyyy-MM-ddTHH:mm)
      const formattedDateTime = this.datePipe.transform(formattedDate, 'yyyy-MM-ddTHH:mm');

      this.eventForm.setValue({
        subject: event.subject || '',
        description: event.description || '',
        dateTime: formattedDateTime || ''
      });

      this.isModalOpen = true;
    }
  }


  closeModal(): void {
    this.isModalOpen = false;
  }




  gotoEvent(eventId: number) {
    this.router.navigate(['admin-event-details', eventId]);
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

  // getEvent(eventId: number) {
  //   this.employeeService.getEventById(eventId).subscribe(
  //     (data: any) => {
  //       this.event = data;
  //       if (this.event && this.event.dateTime) {

  //         this.event.dateTime = this.datePipe.transform(this.event.dateTime, 'dd-MM-yyyy HH:mm:ss');
  //       }
  //       console.log(this.event);

  //     },
  //     (error: any) => {
  //       console.log("error in fetching event", error);
  //     }
  //   );
  // }



  updateEvent(): void {
    if (this.eventForm.valid) {
      this.event = this.eventForm.value;
      this.employeeService.updateEvent(this.eventId, this.event).subscribe(
        (data: any) => {
          console.log("Event updated successfully", data);
          this.showSuccess("Event updated successfully!");

          this.loadSupportRequests();
          this.gotoAllEvents();
          this.eventForm.reset();
          this.closeModal();
        },
        (error: any) => {
          console.error("Error updating event:", error);
          this.showError("Failed to update the event. Please try again.");
        }
      );
    } else {
      console.warn("Invalid form data. Please correct errors.");
      this.showError("Please fill the form correctly.");
    }
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
    if (this.popupMessage === 'Updated event successfully') {
      // this.router.navigate(['admin-event-list']);
    }

    this.popupMessage = null;
  }
  gotoAllEvents() {
    this.activeButton = 'allEvents';
    this.router.navigate(['/admin-event-list']);
  }

  gotoEventCreate() {
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
          <p><b>Description:</b> ${this.event.description || 'No description available'}</p>
        `,
        showConfirmButton: true,
        confirmButtonText: 'Close',
        showCloseButton: false,
        confirmButtonColor: 'gray',
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




