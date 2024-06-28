import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Course } from './Models/Course';
import { Team } from './Models/Team';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
 
  constructor(private http:HttpClient,private auth : AuthService) { }

  private baseurl = "http://localhost:8080";

  getAdminDetails(employeeId: string) {
    return this.http.get<Employee>(`${this.baseurl}/getAdmin/${employeeId}`);
  }
 public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getAllEmployees`);
  }
  updateAdminDetails(employeeId: string, employee: Employee) {
    return this.http.put<Employee>(`${this.baseurl}/updateAdmin/${employeeId}`, employee);
  }
  getAllCourseDetails() {
    return this.http.get<Course[]>(`${this.baseurl}/getCourselist`);
  }

// Update details of employee
public updateEmployeeDetails(employeeId: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseurl}/updateEmployeeDetails/${employeeId}`, employee);
  }
  
  public  getEmployeesList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getEmployeeList`);
  }
  getEmployeesByRole(roleName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/employees/byRole`, {
      params: {
        roleName: roleName
      }
    });
  }
  getEmployeesNotAdmin():Observable<any[]>{
    return this.http.get<Employee[]>(`${this.baseurl}/employees/notAdmin`);
  }



  public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseurl}/addCourse`, course);
  }

  // get details of employee
  public getEmployeeDetails(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.baseurl}/getEmployeeDetails/${employeeId}`
    );
  }

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseurl}/getAllCourses`);
  }

 public addTeam(team: Team, employeeId: string): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addTeamToEmployee/${employeeId}`, team);
  } 


  public login(data: any) {
    return this.http.post<any>(`${this.baseurl}/authenticate`, data);
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
  public getAllTeams(employeeId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseurl}/getAllTeams/${employeeId}`);
  }

 public getTeamByName(teamName: string): Observable<Team> {
    return this.http.get<Team>(`${this.baseurl}/getTeamByName/${teamName}`);
  }

  public deleteEmployeeFromTeam(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/deleteEmployeeFromTeam/${employeeId}`);
  }
  
// Reset Password Employee
public resetPassword(employeeId: string, currentPassword: string, newPassword: string): Observable<any> {
  return this.http.put<any>(`${this.baseurl}/resetPassword/${employeeId}/${currentPassword}/${newPassword}`, {});
}

updateTeam(teamName: string, updatedTeam: Team): Observable<Team> {
  return this.http.put<Team>(`${this.baseurl}/updateTeam/${teamName}`, updatedTeam);
}

deleteTeam(teamName: string): Observable<void> {
  return this.http.delete<void>(`${this.baseurl}/deleteTeam/${teamName}`);
}

  // get Course by course Name
public getCourseByName(courseName: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseurl}/courses/${courseName}`);
  }

  // get course by employee Id
  getCoursesByEmployeeId(employeeId: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.baseurl}/getCoursesByEmployeeId/${employeeId}`
    );
  }


  uploadFile(employeeId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseurl}/uploadPhoto/${employeeId}`, formData, { responseType: 'text' as 'json' });
  }

  getPhoto(employeeId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/getPhoto/${employeeId}`, { responseType: 'blob' });
  }


  // get course by Course Name
  getCourseByCourseName(courseName: string): Observable<Course> {
    return this.http.get<Course>(
      `${this.baseurl}/getCourseByCourseName/${courseName}`
    );
  }

  updatePhoto(employeeId: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo, photo.name);

    return this.http.put<any>(`${this.baseurl}/updatePhoto/${employeeId}`, formData);
  }

}
