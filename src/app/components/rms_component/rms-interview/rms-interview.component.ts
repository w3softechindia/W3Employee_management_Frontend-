import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-rms-interview',
  templateUrl: './rms-interview.component.html',
  styleUrls: ['./rms-interview.component.scss']
})
export class RmsInterviewComponent implements OnInit {
  isLoading: boolean = false;
  teamLeads: Employee[] = [];
  scheduleInterviewForm: FormGroup;

  showPopup = false;
  isSuccess = false;
  dialogTitle: string;
  dialogMessage: string;
  dialogTemplate: ComponentType<unknown>;

  constructor(
    private employeeService: RmsServiceService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    // Initialize the form with validators
    this.scheduleInterviewForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      reference: ['', Validators.required],
      interviewDateTime: ['', Validators.required],
      interviewLocation: [{ value: '', disabled: true }],  // Initially disabled
      interviewStatus: ['Pending'],  // Default to "Pending"
      teamLeadId: ['', Validators.required],
      jobRole: ['', Validators.required],
      interviewMode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTeamLeads();

    // Listen to changes in the interviewMode field to enable/disable the interviewLocation
    this.scheduleInterviewForm.get('interviewMode')?.valueChanges.subscribe((mode) => {
      const interviewLocationControl = this.scheduleInterviewForm.get('interviewLocation');
      if (mode === 'online') {
        interviewLocationControl?.enable();  // Enable location input when 'online' is selected
      } else {
        interviewLocationControl?.disable(); // Disable when 'offline' is selected
        interviewLocationControl?.reset();   // Clear the input when disabled
      }
    });
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

      this.isLoading = true;

      // Call service to schedule interview
      this.employeeService.scheduleInterview(interview, interview.teamLeadId).subscribe(
        response => {
          console.log('Scheduled Interview', response);
          this.isSuccess = true;
          this.showPopup = true;
          
          setTimeout(() => {
            this.isLoading = false;
            setTimeout(() => this.closePopup(), 2000);
          }, 2000);
        },
        error => {
          console.error('Error scheduling interview', error);
          this.isSuccess = false;
          this.showPopup = true;
          this.isLoading = false;
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
