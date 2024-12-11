import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { RelievingCandidate } from 'src/app/Models/RelievingCandidate';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-relieved-candidate',
  templateUrl: './relieved-candidate.component.html',
  styleUrls: ['./relieved-candidate.component.scss']
})
export class RelievedCandidateComponent implements OnInit{
  relieve: RelievingCandidate[] = [];

  constructor(private leaveService: EmployeeService, private http: HttpClient) {}


  ngOnInit(): void {
    this.fetchRelievingList();
  }

  fetchRelievingList(): void {
    this.leaveService.getRelievedList().subscribe(
      (data: RelievingCandidate[]) => {
        console.log(data);
        this.relieve = data;
      },
      (error: any) => {
        console.error('Error fetching Leaves:', error);
      }
    );
  }
  
}