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

// Update details of employee
public updateEmployeeDetails(employeeId: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseurl}/updateEmployeeDetails/${employeeId}`, employee);
  }


  public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseurl}/addCourse`, course);
  }

  // get details of employee
  public getEmployeeDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseurl}/getEmployeeDetails/${employeeId}`);
  }

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseurl}/getAllCourses`);
  }

 public addTeam(team: Team, employeeId: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addTeamToEmployee/${employeeId}`, team);
  }

 public getTlDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseurl}/getTlDetails/${employeeId}`);
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getAllEmployees`);
  }

  public login(data:any){
    return this.http.post<any>(`${this.baseurl}/authenticate`,data)
  }

 public addEmployee(employee: Employee, roleName: string): Observable<Employee> {

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
  
// Reset Password Employee
resetPassword(employeeId: string, currentPassword: string, newPassword: string): Observable<any> {
  return this.http.put<any>(`${this.baseurl}/resetPassword/${employeeId}/${currentPassword}/${newPassword}`, {});
}

  // get Course by course Name
 getCourseByName(courseName: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseurl}/courses/${courseName}`);
  }
}

