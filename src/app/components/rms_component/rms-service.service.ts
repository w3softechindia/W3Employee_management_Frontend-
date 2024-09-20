import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';

@Injectable({
  providedIn: 'root'
})
export class RmsServiceService {


  private baseurl = 'http://localhost:5050';

  constructor(private http: HttpClient) { }

  getTeamLeads(): Observable<Employee[]>
   {
    return this.http.get<Employee[]>(`${this.baseurl}/getTeamleads`);
     // Adjust the URL to match your backend endpoint
  }

  getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.baseurl}/getEmployees`);
}
scheduleInterview(interview: Rms_Interview, teamLeadId: string): Observable<Rms_Interview> {
  return this.http.post<Rms_Interview>(`${this.baseurl}/scheduleInterview/${teamLeadId}`, interview);
}

getInterviewById(interviewId: number): Observable<Rms_Interview> {
  return this.http.get<Rms_Interview>(`${this.baseurl}/getInterviewById/${interviewId}`);
}

getInterviewsByEmployeeId(employeeId: string): Observable<Rms_Interview[]> {
  return this.http.get<Rms_Interview[]>(`${this.baseurl}/getInterviewsByEmployeeId/${employeeId}`);
}

// getTeamLeads(): Observable<Employee[]> {
//   return this.http.get<Employee[]>(`${this.baseurl}/team-leads`);
// }

// scheduleInterview(interview: any): Observable<any> {
//   return this.http.post(`${this.baseurl}/schedule`, interview);
// }


}
