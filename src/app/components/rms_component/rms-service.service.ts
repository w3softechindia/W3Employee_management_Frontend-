import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailConfirmationDto } from 'src/app/Models/email-confirmation-dto';
import { Applicant } from 'src/app/Models/applicant';

@Injectable({
  providedIn: 'root',
})
export class RmsServiceService {
  // private baseurl = 'http://localhost:8082';

  private baseurl = 'https:///lms-backend-5e890b1bbe26.herokuapp.com';

  constructor(private http: HttpClient) {}

  getTeamLeads(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getTeamLeads`);
  }

  scheduleInterview(
    interview: Rms_Interview,
    teamLeadId: string
  ): Observable<Rms_Interview> {
    return this.http.post<Rms_Interview>(
      `${this.baseurl}/scheduleInterview/${teamLeadId}`,
      interview
    );
  }
  getAllEmployeeInterviewDetails(): Observable<EmployeeInterviewDetailsDto[]> {
    return this.http.get<EmployeeInterviewDetailsDto[]>(
      `${this.baseurl}/getAllEmployeeInterviewDetails`
    );
  }

  updateInterviewStatus(
    interviewId: number,
    status: string
  ): Observable<Rms_Interview> {
    const url = `${this.baseurl}/updateInterviewStatus/${interviewId}/${status}`; // Use correct path variables

    return this.http.put<Rms_Interview>(url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  submitApplicantForm(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseurl}/applicantForm`, formData);

  }

  // getApplicant(id: number): Observable<Applicant> {
  //   return this.http.get<Applicant>(`${this.baseurl}/getApplicant/${id}`);
  // }
  getApplicants(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(`${this.baseurl}/getAllApplicantDetails`);
  }
  // getAllEmployeeInterviewDetails(): Observable<EmployeeInterviewDetailsDto[]> {
  //   return this.http.get<EmployeeInterviewDetailsDto[]>(
  //     `${this.baseurl}/getAllEmployeeInterviewDetails`
  //   );
  // }
  // updateReconfirmationStatus(id: number, status: string, uncheckedList: string): Observable<Applicant> {
  //   return this.http.put<Applicant>(`${this.baseurl}/updateReconfirmationStatus/{id}/{status}/{uncheckedList}`, {});
  // }
  
  updateReconfirmationStatus(id: number, status: string, uncheckedList: string): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/updateReconfirmationStatus/${id}/${status}/${uncheckedList}`, {});
  }
  updateOfferLetterStatus(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/updateGenerateOfferLetterStatus/${id}/${status}`, {});
  }
  
}
