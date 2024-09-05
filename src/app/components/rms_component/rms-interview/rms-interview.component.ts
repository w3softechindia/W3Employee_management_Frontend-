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
      interviewDescription: [''],
      interviewDateTime: ['', Validators.required],
      interviewLocation: [''],
      interviewStatus: ['Scheduled'],
      employeeId: ['', Validators.required],
      teamLeadId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadTeamLeads();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      error => {
        console.error('Error fetching employees', error);
      }
    );
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
      const employeeId = interview.employeeId;
      const teamLeadId = interview.teamLeadId;
      


      this.employeeService.scheduleInterview(interview, employeeId, teamLeadId).subscribe(
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
