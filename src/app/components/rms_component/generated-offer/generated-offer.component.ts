import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { RmsServiceService } from '../rms-service.service';
import { Applicant } from 'src/app/Models/applicant';

@Component({
  selector: 'app-generated-offer',
  templateUrl: './generated-offer.component.html',
  styleUrls: ['./generated-offer.component.scss']
})
export class GeneratedOfferComponent implements OnInit {

applicants: Applicant[] = []; // To hold the list of applicants
isLoading: any;
showError: any;
 
constructor(private rmsService: RmsServiceService, private http: HttpClient) {}
ngOnInit(): void {
  this.fetchApplicants();
}

// Fetch all applicants
fetchApplicants(): void {
  this.rmsService.getApplicantsletter().subscribe(
    (data: Applicant[]) => {
      this.applicants = data;
      // this.isLoading = false;
    },
    (error) => {
      console.error('Error fetching applicants:', error);
    }
  );
}

}

