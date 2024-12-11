import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { EmployeeService } from 'src/app/employee.service';
import { SupportRequest } from 'src/app/Models/SupportRequest';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-user-request-list',
  templateUrl: './user-request-list.component.html',
  styleUrls: ['./user-request-list.component.scss']
})
export class UserRequestListComponent implements OnInit {
  supportRequests: any[] = [];
  supportRequest: any;

  ticketId: number;

  // supportRequest:SupportRequest;
  supportRequestForm: FormGroup;
  ticket: number;
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  isModalOpen: boolean = false; 
  
  

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.getAllSupportRequest();

    // this.supportRequestForm = this.fb.group({
    //   subject: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20), this.noDirtyDataValidator()]],
    //   description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100), this.noDirtyDataValidator()]],

    // });

    this.supportRequestForm = this.fb.group({
      subject: ['', Validators.required],    // Ensure 'subject' is initialized
      description: ['', Validators.required] // Ensure 'description' is initialized
    });
    
    // this.supportRequestForm.get('description')?.valueChanges.subscribe(value => {
    //   console.log('Description Value Changed:', value);
    // });
    this.ticket = this.route.snapshot.params['ticketId'];
    this.getSupportRequest(this.ticket);
  }

  activeButton: string = 'allRequests'; // Default active button

  setActiveButton(buttonName: string): void {
    this.activeButton = buttonName;
  }


  closeModal() {
    this.isModalOpen = false;
  }
  
  
  // updateRequest(ticketId: number) {

  //   this.router.navigate(['/user-request-update', ticketId]);
  // }

  // gotoRequest(ticketId:number) {
  // this.router.navigate(['user-request-details',ticketId]);
  // }
  gotoRequests() {
    this.router.navigate(['user-create-request']);
  }
  getAllSupportRequest() {
    this.employeeService.getAllSupportRequest().subscribe(
      (data: any) => {
        this.supportRequests = data;
        this.formatDateTimes();
        console.log(this.supportRequests);
      },
      (error: any) => {
        console.log("error in fetching details", error);
      }
    );
  }
  formatDateTimes(): void {
    this.supportRequests.forEach(request => {
      request.dateTime = this.datePipe.transform(request.dateTime, 'dd-MM-yyyy HH:mm:ss');
    });
  }


  // getSupportRequest(ticketId:number){
  //   this.employeeService.getSupportRequestById(ticketId).subscribe(
  //     (data:any)=>{
  //       this.supportRequest=data;
  //       if (this.supportRequest && this.supportRequest.dateTime) {

  //         this.supportRequest.dateTime = this.datePipe.transform(this.supportRequest.dateTime, 'dd-MM-yyyy HH:mm:ss');
  //       }
  //   console.log(this.supportRequest);
  //     },
  //     (error:any)=>{
  //       console.log("error in fetching supportRequest",error);
  //    } 
  //   );
  // }

  gotoRequest(ticketId: number) {
    this.getSupportRequest(ticketId);
  }

  getSupportRequest(ticketId: number) {
    this.employeeService.getSupportRequestById(ticketId).subscribe(
      (data: any) => {
        this.supportRequest = data;
        this.supportRequestForm.patchValue({
          subject: this.supportRequest.subject,
          description: this.supportRequest.description,


        });

        if (this.supportRequest && this.supportRequest.dateTime) {
          this.supportRequest.dateTime = this.datePipe.transform(
            this.supportRequest.dateTime,
            'dd-MM-yyyy HH:mm:ss'
          );
        }
        this.showSupportRequestDetails(this.supportRequest); // Trigger Swal
      },
      (error: any) => {
        console.error('Error in fetching support request', error);
      }
    );
  }

  showSupportRequestDetails(supportRequest: any) {

    Swal.fire({

      title: `<h3 style="background-color: #4caf50; color: white;padding: 10px; border-radius: 5px; margin: 0;">Request Details</h3>`,
      html: `
      <p><strong>Ticket Id:</strong> ${supportRequest.ticketId}</p>
      <p><strong>Subject:</strong> ${supportRequest.subject}</p>
      <p><strong>Description:</strong> ${supportRequest.description}</p>
      <p><strong>DateTime:</strong> ${supportRequest.dateTime}</p>
      <p><strong>Posted By:</strong> ${supportRequest.postedBy}</p>
      <p><strong>Status:</strong> ${supportRequest.status ? 'Not Solved' : 'Solved'}</p>

    `,

      width: '500px',
      showCloseButton: true,
      confirmButtonText: 'Close',
      confirmButtonColor: 'gray',
      customClass: {
        popup: 'custom-swal-popup',
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
    this.closeModal();
    this.popupMessage = null;
  }
  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
  }


  openEditModal(ticketId: number) {
    console.log("Editing request for ticket ID:", ticketId);
    this.ticket = ticketId;
  
    // Call the service to fetch the data for the given ticketId
    this.employeeService.getSupportRequestById(ticketId).subscribe(
      (data: any) => {
        console.log("Fetched request data:", data);
        // Pre-fill the form with the fetched data
        this.supportRequestForm.patchValue({
          subject: data.subject,
          description: data.description
        });
  
        // Open the modal
        this.isModalOpen = true;
      },
      (error: any) => {
        console.error("Error fetching request data", error);
        this.showError("Failed to fetch request data.");
      }
    );
  }
  

//   updateSupportRequest() {
      
//     if (!this.supportRequestForm.invalid) {
//         // Use form values to create the support request object
//         this.supportRequest = this.supportRequestForm.value;
//         console.log("Form Values:", this.supportRequestForm.value); 
//         console.log("update request is :",this.supportRequest);
//         this.employeeService.updateSupportRequest(this.ticket, this.supportRequest).subscribe(
//             (data: any) => {
//                 console.log("Updated request successfully", data);
//                 this.showSuccess("Updated request successfully");
//             },
//             (error: any) => {
//                 console.log("Error in updating request", error);
//                 this.showError("Updating request failed");
//             }
//         );
//     } else {
//       console.log("Form is invalid:", this.supportRequestForm.errors);
//         console.log("Please fill the form correctly");
//         this.showError("Please fill the form correctly");
//     }
// }


updateSupportRequest() {
  if (!this.supportRequestForm.invalid) {
    // Use form values to create the support request object
    this.supportRequest = this.supportRequestForm.value;
    // console.log("Form Values:", this.supportRequest);

    this.employeeService.updateSupportRequest(this.ticket, this.supportRequest).subscribe(
      (data: any) => {
        console.log("Updated request successfully", data);
        this.showSuccess("Updated request successfully");
        this.getAllSupportRequest();
      
      },
        (error: any) => {
        console.log("Error in updating request", error);
        this.showError("Updating request failed");
      }
    );
  } else {
    console.log("Form is invalid:", this.supportRequestForm.errors);
    this.showError("Please fill the form correctly");
  }
}



}

