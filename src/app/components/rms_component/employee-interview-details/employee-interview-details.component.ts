import { Component, OnInit } from '@angular/core';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { RmsServiceService } from '../rms-service.service';

@Component({
  selector: 'app-employee-interview-details',
  templateUrl: './employee-interview-details.component.html',
  styleUrls: ['./employee-interview-details.component.scss']
})
export class EmployeeInterviewDetailsComponent implements OnInit {
  interviewDetails: EmployeeInterviewDetailsDto[] = [];
  isLoading: boolean = true;
  showError: boolean = false;

  constructor(private rmsService: RmsServiceService) {}

  ngOnInit(): void {
    this.getEmployeeInterviewDetails();
  }

  getEmployeeInterviewDetails(): void {
    this.rmsService.getAllEmployeeInterviewDetails().subscribe(
      (data: EmployeeInterviewDetailsDto[]) => {
        this.interviewDetails = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching employee interview details:', error);
        this.isLoading = false;
        this.showError = true;
      }
    );
  }
}