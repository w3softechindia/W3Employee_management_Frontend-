import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-rms-interview',
  templateUrl: './rms-interview.component.html',
  styleUrls: ['./rms-interview.component.scss']

})
export class RmsInterviewComponent  implements OnInit 
{
  employees: any[] = [];
  teamLeads: any[] = [];

  getTeamLeads(): void {
    this.http.get<any[]>('http://localhost:5050/getTeamLeads').subscribe(
      (data) => {
        this.teamLeads = data;
      },
      (error) => {
        console.error('Error fetching team leads', error);
      }
    );
  }
  scheduleInterviewForm: FormGroup;
  showSuccessPopup = false;
  showErrorPopup = false;

  constructor(
    private employeeService: RmsServiceService,
    private fb: FormBuilder,
    private http: HttpClient
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


  ngOnInit(): void 
  {   this.loadTeamLeads();
   this.getTeamLeads();
  }

  loadTeamLeads(): void 
  {
    console.log('Hello team leads loading ');
    this.employeeService.getTeamLeads().subscribe(
      (data) => {
        this.teamLeads = data;
        console.log('Team Leads:', this.teamLeads);
        console.log('Hello team leads loading ');
      },
    
      (error) => {
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
