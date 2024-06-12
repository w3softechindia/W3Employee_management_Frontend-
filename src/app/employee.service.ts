import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Course } from './Models/Course';
import { Team } from './Models/Team';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient,private auth : AuthService) { }

  private baseurl = "http://localhost:8080";


  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseurl}/getAllCourses`);
  }
  
  getEmployees(): Observable<any[]> {
    const headers = new HttpHeaders();
    return this.http.get<any[]>(this.baseurl, { headers });
  }

   // Get details of employee
  getEmployeeDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseurl}/getEmployeeDetails/${employeeId}`);
  }

  addCourse(courseData: any): Observable<Course> {
    return this.http.post<Course>(`${this.baseurl}/addCourse`, courseData);
  }

  addTeam(team: Team, employeeId: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addTeamToEmployee/${employeeId}`, team);
  }

  


  // update details of employee
  updateEmployeeDetails(employeeId: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseurl}/updateEmployeeDetails/${employeeId}`, employee);
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
