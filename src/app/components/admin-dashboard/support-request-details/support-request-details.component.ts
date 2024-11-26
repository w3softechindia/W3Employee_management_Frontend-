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
    const replyMessage = this.myForm.get('message')?.value || '';

    // Ensure correct data structure for support request
    const updatedRequest = {
      description: this.supportRequest.description,
      status: this.supportRequest.status,
      dateTime: this.supportRequest.dateTime || new Date(), // Use current date if null
      postedBy: this.supportRequest.postedBy,
    };

    // Update the support request
    this.employeeService.updateSupportRequest(this.ticketId, updatedRequest).subscribe(
      (data: any) => {
        console.log("Request updated successfully", data);
        this.showSuccess("Request Updated Successfully");

        // Now send the reply and email (trigger after the update)
        this.employeeService.sendRequestReply(this.ticketId, this.supportRequest.postedBy, replyMessage).subscribe(
          (emailResponse: any) => {
            console.log("Email sent successfully", emailResponse);
          },
          (emailError: any) => {
            console.error("Error sending email", emailError);
          }
        );
      },
      (error: any) => {
        console.error("Error updating request", error);
      }
    );
  } else {
    console.error("Invalid form data");
  }
}

}


