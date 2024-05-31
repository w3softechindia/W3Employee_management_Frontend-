import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  private baseurl = "http://localhost:8080";

  //get details of employee
  public getEmployeeDetails(employeeId : string):Observable<any>  {
    return this.http.get(`${this.baseurl}/getEmployeeDetails`);
  }
}
