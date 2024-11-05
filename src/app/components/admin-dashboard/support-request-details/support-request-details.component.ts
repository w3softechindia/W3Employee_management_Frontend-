// import { DatePipe } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from 'src/app/employee.service';

// @Component({
//   selector: 'app-support-request-details',
//   templateUrl: './support-request-details.component.html',
//   styleUrls: ['./support-request-details.component.scss']
// })
// export class SupportRequestDetailsComponent implements OnInit {
//   supportRequest: any;
//   replyMsg: string = '';
//   ticketId: number;
//   employeeId: string;
//   popupMessage: string | null = null;
//   textcolor: string;
//   popupIcon: SafeHtml;
//   popupTitle: string = '';
//   popupType: string = '';
//   tickIcon: SafeHtml;
//   errorIcon: SafeHtml;
//   isSuccess: boolean;
//   myForm: FormGroup;

//   constructor(
//     private fb: FormBuilder, 
//     private router: Router,
//     private datePipe: DatePipe,
//     private route: ActivatedRoute,
//     private authService: AuthService,
//     private sanitizer: DomSanitizer,
//     private employeeService: EmployeeService
//   ) {
//     this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
//     this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
//   }

//   ngOnInit(): void {
//     this.myForm = this.fb.group({
//       message: ['', Validators.required] 
//     });
//     this.ticketId = this.route.snapshot.params['ticketId'];
//     this.getSupportRequest(this.ticketId);
//   }

//   showError(message: string) {
//     this.popupType = 'error';
//     this.popupIcon = this.errorIcon;
//     this.popupTitle = 'Error';
//     this.popupMessage = message;
//     this.textcolor = 'red';
//     this.isSuccess = false;
//   }

//   showSuccess(message: string) {
//     this.popupType = 'success';
//     this.popupIcon = this.tickIcon;
//     this.popupTitle = 'Success';
//     this.popupMessage = message;
//     this.textcolor = '#1bbf72';
//     this.isSuccess = true;
//   }

//   closePopup() {
//     this.popupMessage = null;
//   }

//   getSupportRequest(ticketId: number) {
//     this.employeeService.getSupportRequestById(ticketId).subscribe(
//       (data: any) => {
//         this.supportRequest = data;
//         if (this.supportRequest && this.supportRequest.dateTime) {
//           this.supportRequest.dateTime = this.datePipe.transform(this.supportRequest.dateTime, 'dd-MM-yyyy HH:mm:ss');
//         }
//         console.log(this.supportRequest);
//       },
//       (error: any) => {
//         console.log("Error fetching supportRequest", error);
//       }
//     );
//   }

//   addText(text: string) {
//     this.myForm.get('message')?.setValue(text);
//   }

//   // sendMsg() {
//   //   this.employeeId = this.supportRequest.postedBy;
//   //   if (this.myForm.valid) {
//   //     this.replyMsg = this.myForm.get('message')?.value || '';
//   //     this.supportRequest.replyMessage = this.replyMsg;  // Update support request with the reply message

//   //     this.employeeService.updateSupportRequest(this.supportRequest.ticketId, this.supportRequest).subscribe(
//   //       (data: any) => {
//   //         console.log("Request updated successfully", data);

//   //         this.employeeService.sendRequestReply(this.supportRequest.ticketId, this.employeeId, this.replyMsg).subscribe(
//   //           (response: any) => {
//   //             console.log("Reply sent successfully", response);
//   //             this.showSuccess("Reply Message sent successfully");
//   //           },
//   //           (error: any) => {
//   //             console.log("Error sending replyMsg", error);
//   //             this.showError("Error sending reply message");
//   //           }
//   //         );
//   //       },
//   //       (error: any) => {
//   //         console.log("Error updating request", error);
//   //         this.showError("Error updating request");
//   //       }
//   //     );
//   //   } else {
//   //     console.log("Invalid data");
//   //     this.showError("Please fill out the form correctly");
//   //   }
//   // }

//   sendMsg() {
//     this.employeeId = this.supportRequest.postedBy;
//     if (this.myForm.valid) {
//         this.replyMsg = this.myForm.get('message')?.value || '';
//         this.supportRequest.replyMessage = this.replyMsg;  // Update support request with the reply message

//         // Update support request in the backend
//         this.employeeService.updateSupportRequest(this.supportRequest.ticketId, this.supportRequest).subscribe(
//             (data: any) => {
//                 console.log("Request updated successfully", data);

//                 // Send reply message without showing an error if it fails
//                 this.employeeService.sendRequestReply(this.supportRequest.ticketId, this.employeeId, this.replyMsg).subscribe(
//                     () => {
//                         console.log("Reply sent successfully");
//                         this.showSuccess("Request Solved");
//                     }
//                 );
//             },
//             (error: any) => {
//                 console.log("Error updating request", error);
//                 this.showError("Error updating request");
//             }
//         );
//     } else {
//         console.log("Invalid data");
//         this.showError("Please fill out the form correctly");
//     }
// }


// }


import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-support-request-details',
  templateUrl: './support-request-details.component.html',
  styleUrls: ['./support-request-details.component.scss']
})
export class SupportRequestDetailsComponent implements OnInit {
  supportRequest: any;
  ticketId: number;
  popupMessage: string | null = null;
  textColor: string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  isSuccess: boolean;
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private employeeService: EmployeeService
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      message: ['', Validators.required] 
    });
    this.ticketId = this.route.snapshot.params['ticketId'];
    this.getSupportRequest(this.ticketId);
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textColor = '#1bbf72';
    this.isSuccess = true;
  }

  closePopup() {
    this.popupMessage = null;
  }

  getSupportRequest(ticketId: number) {
    this.employeeService.getSupportRequestById(ticketId).subscribe(
      (data: any) => {
        this.supportRequest = data;
        if (this.supportRequest && this.supportRequest.dateTime) {
          this.supportRequest.dateTime = this.datePipe.transform(this.supportRequest.dateTime, 'dd-MM-yyyy HH:mm:ss');
        }
        console.log(this.supportRequest);
      },
      (error: any) => {
        console.log("Error fetching support request", error);
      }
    );
  }

  sendMsg() {
    if (this.myForm.valid) {
      this.supportRequest.replyMessage = this.myForm.get('message')?.value || '';
      this.employeeService.updateSupportRequest(this.supportRequest.ticketId, this.supportRequest).subscribe(
        (data: any) => {
          console.log("Request updated successfully", data);
          this.showSuccess("Request Updated Successfully");
        },
        (error: any) => {
          console.log("Error updating request", error);
        }
      );
    } else {
      console.log("Invalid data");
    }
  }
}
