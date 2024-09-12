import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { Rms_Interview } from 'src/app/Models/Rms_Interview';

@Injectable({
  providedIn: 'root'
})
export class RmsServiceService {


  private baseurl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee, roleName: string): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseurl}/addEmployee/${roleName}`, employee);
  }

  scheduleInterview(interview: Rms_Interview, employeeId: string, teamLeadId: string): Observable<Rms_Interview> {
    const url = `${this.baseurl}/scheduleInterview/${employeeId}/${teamLeadId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Rms_Interview>(url, interview, { headers });
  }
  // Method to get all interviews (optional, based on your need)
  getAllInterviews(): Observable<Rms_Interview[]> {
    return this.http.get<Rms_Interview[]>(`${this.baseurl}/getAllInterviews`);
  }

  // Method to get interview by ID (optional)
  getInterviewById(interviewId: number): Observable<Rms_Interview> {
    return this.http.get<Rms_Interview>(`${this.baseurl}/getInterviewById/${interviewId}`);
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getAllEmployees`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getEmployees`);
  }

  getTeamLeads(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getTeamLeads`);
  }




}
