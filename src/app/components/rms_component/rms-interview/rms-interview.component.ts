import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { MatDialog } from '@angular/material/dialog';
//import { DialogContentComponent } from '../dialog-content/dialog-content.component';


@Component({
  selector: 'app-rms-interview',
  templateUrl: './rms-interview.component.html',
  styleUrls: ['./rms-interview.component.scss']
})
export class RmsInterviewComponent implements OnInit {
  teamLeads: Employee[] = [];
  scheduleInterviewForm: FormGroup;
  showSuccessPopup = false;
  showErrorPopup = false;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;  // Add ! to indicate it will be initialized
  dialogMessage: string;
  dialogTitle: string;

  constructor(
    private employeeService: RmsServiceService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.scheduleInterviewForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      reference: ['', Validators.required],
      interviewDateTime: ['', Validators.required],
      interviewLocation: [''],
      interviewStatus: ['Pending'],  // Default to "Pending"
      teamLeadId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTeamLeads();
  }

  loadTeamLeads(): void {
    this.employeeService.getTeamLeads().subscribe(
      (teamLeads: Employee[]) => {
        this.teamLeads = teamLeads;
      },
      error => {
        console.error('Error fetching team leads', error);
      }
    );
  }
  openDialog(title: string, message: string): void {
    this.dialogTitle = title;
    this.dialogMessage = message;
    this.dialog.open(this.dialogTemplate);
  }
  scheduleInterview(): void {
    if (this.scheduleInterviewForm.valid) {
      const interview: Rms_Interview = this.scheduleInterviewForm.value;

      this.employeeService.scheduleInterview(interview, interview.teamLeadId).subscribe(
        response => {
          // alert('Scheduled');
          // console.log('Scheduled Interview', response);
          // this.showSuccessPopup = true;
          console.log('Scheduled Interview', response);
          console.log('Scheduled Interview', response);
          this.openDialog('Success', 'Interview has been successfully scheduled!');
          
        },
        error => {
          // alert('Not Scheduled');
          // this.showErrorPopup = true;
         
          console.error('Error scheduling interview', error);
          alert('Failed to schedule the interview.');
        }
      );
    }
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  closeErrorPopup(): void {
    this.showErrorPopup = false;
  }


}
