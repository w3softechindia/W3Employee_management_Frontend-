import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';

@Injectable({
  providedIn: 'root'
})
export class RmsServiceService {


  private baseurl = 'http://localhost:1000';

  constructor(private http: HttpClient) { }

  getTeamLeads(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getTeamLeads`);
  }
  getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.baseurl}/getEmployees`);
}
scheduleInterview(interview: Rms_Interview, employeeId: string, teamLeadId: string): Observable<Rms_Interview> {
  return this.http.post<Rms_Interview>(`${this.baseurl}/scheduleInterview/${employeeId}/${teamLeadId}`, interview);
}

getInterviewById(interviewId: number): Observable<Rms_Interview> {
  return this.http.get<Rms_Interview>(`${this.baseurl}/getInterviewById/${interviewId}`);
}

getInterviewsByEmployeeId(employeeId: string): Observable<Rms_Interview[]> {
  return this.http.get<Rms_Interview[]>(`${this.baseurl}/getInterviewsByEmployeeId/${employeeId}`);
}

  


}
