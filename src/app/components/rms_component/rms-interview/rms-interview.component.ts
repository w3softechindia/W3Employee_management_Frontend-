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
      employeeName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'), // Only characters and spaces
          Validators.minLength(3)
        ]
      ],
      employeeEmail: [
        '',
        [
          Validators.required,
          Validators.email, // Basic Angular email validation
          this.strictEmailValidator // Custom stricter email validation
        ]
      ],
      reference: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'), // Only characters and spaces
          Validators.minLength(3)
        ]
      ],
      interviewDateTime: [
        '',
        [
          Validators.required,
          this.futureDateValidator // Custom validator for future dates
        ]
      ],
      interviewLocation: [
        { value: '', disabled: true, },
        Validators.minLength(3)], // Initially disabled
      interviewStatus: ['Pending'], // Default to "Pending"
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
        interviewLocationControl?.enable(); // Enable location input when 'online' is selected
      } else {
        interviewLocationControl?.disable(); // Disable when 'offline' is selected
        interviewLocationControl?.reset(); // Clear the input when disabled
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
  private strictEmailValidator(control: any): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(control.value) ? null : { invalidEmail: true };
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

  // Custom validator to ensure the date is today or in the future
  private futureDateValidator(control: any): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    // Reset time for current date to compare only date values
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= currentDate ? null : { invalidDate: true };
  }
}
