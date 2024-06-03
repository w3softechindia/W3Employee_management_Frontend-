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

  // update details of employee
  public updateEmployeeDetails(employeeId : string, employee : Employee):Observable<any>{
    return this.http.put(`${this.baseurl}/updateEmployeeDetails`,employee);
  }

  getTlDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseurl}/getTlDetails/${employeeId}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getAllEmployees`);
  }

  login(data:any){
    return this.http.post<any>(`${this.baseurl}/authenticate`,data)
  }

}
