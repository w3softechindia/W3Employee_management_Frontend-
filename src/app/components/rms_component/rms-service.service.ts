import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeInterviewDetailsDto } from 'src/app/Models/Rms_EmployeeInterviewDetails';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';

@Injectable({
  providedIn: 'root'
})
export class RmsServiceService {


  private baseurl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }


 

  getTeamLeads(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getTeamLeads`);
  }

  scheduleInterview(interview: Rms_Interview, teamLeadId: string): Observable<Rms_Interview> {
    return this.http.post<Rms_Interview>(`${this.baseurl}/scheduleInterview/${teamLeadId}`, interview);
  }
  getAllEmployeeInterviewDetails(): Observable<EmployeeInterviewDetailsDto[]> {
    return this.http.get<EmployeeInterviewDetailsDto[]>(`${this.baseurl}/getAllEmployeeInterviewDetails`);
  }

  updateInterviewStatus(interviewId: number, status: string): Observable<Rms_Interview> {
    const url = `${this.baseurl}/updateInterviewStatus/${interviewId}/${status}`; // Use correct path variables

    return this.http.put<Rms_Interview>(url, null, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}





