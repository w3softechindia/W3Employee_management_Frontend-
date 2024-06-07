import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Course } from './Models/Course';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient,private auth : AuthService) { }

  private baseurl = "http://localhost:8080";


   // Get details of employee
  getEmployeeDetails(employeeId: string): Observable<Employee> {
    const token = this.auth.getToken(); // Method to get the token from AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Employee>(`${this.baseurl}/getEmployeeDetails/${employeeId}`, { headers });

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseurl}/addCourse`, course);
  }

  addTeam(team: string, employeeId: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addTeam/${employeeId}`, team);
  }

  //get details of employee
  getEmployeeDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseurl}/getEmployeeDetails/${employeeId}`);
  }

  // update details of employee
  updateEmployeeDetails(employeeId: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseurl}/updateEmployeeDetails/${employeeId}`, employee);

  }
 // Update details of employee
 updateEmployeeDetails(employeeId: string, updatedData: Employee): Observable<any> {
  const url = `${this.baseurl}/employees/${employeeId}`;
  return this.http.put(url, updatedData);
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



  addEmployee(employee: Employee, roleName: string): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseurl}/addEmployee/${roleName}`, employee);
  }

  public roleMatch(userRoles: { roleName: string }[], allowedRoles: string[]): boolean {
    for (const userRole of userRoles) {
      if (allowedRoles.includes(userRole.roleName)) {
        return true;

      }
    }
    return false;
  }
}
