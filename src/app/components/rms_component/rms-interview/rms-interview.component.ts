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
  isLoading: boolean = false; // Loading state
  teamLeads: Employee[] = [];
  scheduleInterviewForm: FormGroup;

  showPopup = false; // Show/Hide popup
  isSuccess = false; // Track success or error state

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

      this.isLoading = true; // Show loading spinner

      this.employeeService.scheduleInterview(interview, interview.teamLeadId).subscribe(
        response => {
          console.log('Scheduled Interview', response);
          this.isSuccess = true; // Set success state
          this.showPopup = true;  // Show popup
          
          // Simulate a delay to represent the loading time
          setTimeout(() => {
            this.isLoading = false; // Hide loading spinner
            // Optionally, close the popup after a delay
            setTimeout(() => this.closePopup(), 2000);
          }, 2000); // Simulating a delay of 2 seconds
        },
        error => {
          console.error('Error scheduling interview', error);
          this.isSuccess = false; // Set error state
          this.showPopup = true;  // Show popup
          this.isLoading = false; // Hide loading spinner
        }
      );
    }
  }
  

  closePopup(): void {
    this.showPopup = false; // Hide popup
  }

}
