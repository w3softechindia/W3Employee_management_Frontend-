import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';


@Component({
  selector: 'app-rms-interview',
  templateUrl: './rms-interview.component.html',
  styleUrls: ['./rms-interview.component.scss']
})
export class RmsInterviewComponent  implements OnInit {
  employees: Employee[] = [];
  teamLeads: Employee[] = [];
  scheduleInterviewForm: FormGroup;
  showSuccessPopup = false;
  showErrorPopup = false;

  constructor(
    private employeeService: RmsServiceService,
    private fb: FormBuilder
  ) {
    this.scheduleInterviewForm = this.fb.group({
      interviewTitle: ['', Validators.required],
      interviewDateTime: ['', Validators.required],
      interviewLocation: [''],
      interviewStatus: ['Scheduled'],
      teamLeadId: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeeName: ['', Validators.required],
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

  scheduleInterview(): void {
    if (this.scheduleInterviewForm.valid) {
      const interview: Rms_Interview = this.scheduleInterviewForm.value;
      const teamLeadId = interview.teamLeadId;
      


      this.employeeService.scheduleInterview(interview,teamLeadId).subscribe(
        response => {
            alert('Scheduled');
            console.log('Scheduled meeting', response);          
        },
        error => {
          console.error('Error scheduling interview', error);
          this.showErrorPopup = true;
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
