import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Course } from './Models/Course';
import { Team } from './Models/Team';
import { SubCourse } from './Models/SubCourse';
import { Task } from './Models/Task';
import { SessionsDTO } from './Models/sessions.dto';
import { Session } from './Models/Session';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private auth: AuthService) { }
  private baseurl = 'http://localhost:5000';
  // private baseurl = 'http://Lmsbackend-env.eba-g9hs797u.ap-south-1.elasticbeanstalk.com';

  getTotalTeamsByTeamLead(employeeId: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseurl}/getTotalTeamsByTeamLead/${employeeId}`
    );
  }

  getCourses(employeeId: string): Observable<Set<Course>> {
    return this.http.get<Set<Course>>(
      `${this.baseurl}/getCourses/${employeeId}`
    );
  }

  getAdminDetails(employeeId: string) {
    return this.http.get<Employee>(`${this.baseurl}/getAdmin/${employeeId}`);
  }
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/getAllEmployees`);
  }
  updateAdminDetails(employeeId: string, employee: Employee) {
    return this.http.put<Employee>(
      `${this.baseurl}/updateAdmin/${employeeId}`,
      employee
    );
  }
  getAllCourseDetails() {
    return this.http.get<Course[]>(`${this.baseurl}/getCourselist`);
  }

  // Update details of employee
  public updateEmployeeDetails(
    employeeId: string,
    employee: Employee
  ): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.baseurl}/updateEmployeeDetails/${employeeId}`,
      employee
    );
  }

  public getEmployeesList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getEmployeeList`);
  }
  getEmployeesByRole(roleName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseurl}/employees/byRole`, {
      params: {
        roleName: roleName,
      },
    });
  }

  getEmployeesNotAdmin(): Observable<any[]> {
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
  checkDuplicateEmail(email: string): Observable<any> {
    console.log('servicemethod checkduplicateemail', email);
    return this.http.get<boolean>(`${this.baseurl}/checkEmail/${email}`);
  }
  checkDuplicateWebMail(webMail: string): Observable<any> {
    return this.http.get<boolean>(`${this.baseurl}/checkWebMail/${webMail}`);
  }
  checkDuplicatePhoneNumber(phoneNumber: number): Observable<any> {
    return this.http.get<boolean>(
      `${this.baseurl}/checkPhoneNumber/${phoneNumber}`
    );
  }
  checkDuplicateEmailToUpdate(
    employeeId: string,
    email: string
  ): Observable<any> {
    console.log('servicemethod checkduplicateemail', email);
    return this.http.get<boolean>(
      `${this.baseurl}/checkEmailToUpdate/${employeeId}/${email}`
    );
  }
  checkDuplicatePhoneNumberToUpdate(
    employeeId: string,
    phoneNumber: number
  ): Observable<any> {
    return this.http.get<boolean>(
      `${this.baseurl}/checkPhoneNumberToUpdate/${employeeId}/${phoneNumber}`
    );
  }
  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseurl}/getAllCourses`);
  }

  public addTeam(team: Team, employeeId: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseurl}/addTeamToEmployee/${employeeId}`,
      team
    );
  }

  public login(data: any) {
    return this.http.post<any>(`${this.baseurl}/authenticate`, data);
  }

  public addEmployee(
    employee: Employee,
    roleName: string
  ): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.baseurl}/addEmployee/${roleName}`,
      employee
    );
  }

  public roleMatch(
    userRoles: { roleName: string }[],
    allowedRoles: string[]
  ): boolean {
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
    return this.http.delete<any>(
      `${this.baseurl}/deleteEmployeeFromTeam/${employeeId}`
    );
  }

  // Reset Password Employee
  public resetPassword(
    employeeId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put<any>(
      `${this.baseurl}/resetPassword/${employeeId}/${currentPassword}/${newPassword}`,
      {}
    );
  }

  getNumberOfCourses(): Observable<number> {
    return this.http.get<number>(`${this.baseurl}/getNumberOfCourses`);
  }

  updateTeam(teamName: string, updatedTeam: Team): Observable<Team> {
    return this.http.put<Team>(
      `${this.baseurl}/updateTeam/${teamName}`,
      updatedTeam
    );
  }

  deleteTeam(teamName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/deleteTeam/${teamName}`);
  }

  // get Course by course Name
  // public getCourseByName(courseName: string): Observable<Course> {
  //   return this.http.get<Course>(`${this.baseurl}/courses/${courseName}`);
  // }
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

    return this.http.post(
      `${this.baseurl}/uploadPhoto/${employeeId}`,
      formData,
      { responseType: 'text' as 'json' }
    );
  }

  getPhoto(employeeId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/getPhoto/${employeeId}`, {
      responseType: 'blob',
    });
  }

  // get course by Course Name
  getCourseByCourseName(courseName: string): Observable<Course> {
    return this.http.get<Course>(
      `${this.baseurl}/getCourseByCourseName/${courseName}`
    );
  }

  // get Task by EmployeeId
  getTasksByEmployeeId(employeeId: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.baseurl}/getTasksByEmployeeId/${employeeId}`
    );
  }

  // update task by task Id
  public updateTask(taskId: string, status: string): Observable<any> {
    const url = `${this.baseurl}/updateTaskStatus/${taskId}/${status}`;
    return this.http.put(url, { status }).pipe(
      catchError((error) => {
        console.error('Error updating task status:', error);
        return throwError(
          'Failed to update task status. Please try again later.'
        );
      })
    );
  }
  updatePhoto(employeeId: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo, photo.name);

    return this.http.put<any>(
      `${this.baseurl}/updatePhoto/${employeeId}`,
      formData
    );
  }

  // update Course Status in learning track
  updateCourseProgress(
    courseName: string,
    progress: number
  ): Observable<Course> {
    const url = `${this.baseurl}/updateCourseProgress/${courseName}/${progress}`;
    return this.http.put<Course>(url, {});
  }

  public updateEmployeeStatus(
    employeeId: string,
    status: string
  ): Observable<any> {
    return this.http.put(
      `${this.baseurl}/updateEmployeeStatus/${employeeId}`,
      status
    );
  }

  getTotalEmployeesByRole(rolename: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseurl}/employeesNumber/byRole/${rolename}`
    );
  }

  getTotalCourses(): Observable<Number> {
    return this.http.get<Number>(`${this.baseurl}/getTotalCourses`);
  }

  public getAllTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseurl}/getAllTeam`);
  }

  public getTotalTeams(): Observable<Number> {
    return this.http.get<Number>(`${this.baseurl}/getTotalTeams`);
  }

  getEmployeesNotAdminAfterStatus(): Observable<any[]> {
    return this.http.get<Employee[]>(
      `${this.baseurl}/employeesAfterStatus/notAdmin`
    );
  }

  getEmployeesByRoleAfterStatus(roleName: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseurl}/employeesAfterStatus/byRole`,
      {
        params: {
          roleName: roleName,
        },
      }
    );
  }

  getPhotoAdmin(employeeId: string): Observable<any> {
    return this.http.get(`${this.baseurl}/getPhotoAdmin/${employeeId}`, {
      responseType: 'blob',
    });
  }

  // get Subcourse by SubCourse Name
  getSubCourseBySubName(subCourseName: string): Observable<SubCourse> {
    return this.http.get<SubCourse>(
      `${this.baseurl}/getSubCourseBySubName/${subCourseName}`
    );
  }

  // update SubCourse Progress
  updateSubCourseProgress(
    subCourseName: string,
    progress: number
  ): Observable<SubCourse> {
    return this.http.put<SubCourse>(
      `${this.baseurl}/${subCourseName}/progress?progress=${progress}`,
      {}
    );
  }

  // get meeting link by TeamName
  getMeetingLinkByTeamName(teamName: string): Observable<string> {
    return this.http.get(
      `${this.baseurl}/getMeetingLinkByTeamName/${teamName}`,
      { responseType: 'text' }
    );
  }

  // update SubCourse Status
  updateSubCourseStatus(
    subCourseName: string,
    status: string
  ): Observable<SubCourse> {
    const url = `${this.baseurl}/updateSubCourseStatus/${subCourseName}/${status}`;
    return this.http.put<SubCourse>(url, {});
  }

  getTasksByTeamlead(teamName: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.baseurl}/getTasksByTeamlead/${teamName}`
    );
  }
  //  getting Sub course
  getSubCourse(subCourseName: string): Observable<SubCourse> {
    return this.http.get<SubCourse>(`${this.baseurl}/${subCourseName}`);
  }
  //getting tem by employee Id
  getTeamByEmployeeId(employeeId: string): Observable<Team> {
    return this.http.get<Team>(
      `${this.baseurl}/getTeamByEmployeeId/${employeeId}`
    );
  }
  assignTasksToTeam(tasks: Task[], teamName: string): Observable<Task[]> {
    return this.http.post<Task[]>(
      `${this.baseurl}/assignTasksToTeam/${teamName}`,
      tasks
    );
  }
  markSubCourseCompleted(subCourseName: string) {
    return this.http.put(`${this.baseurl}/${subCourseName}/complete`, null);
  }

  // checkDuplicateEmail(email:string):Observable<any> {
  //   console.log("servicemethod checkduplicateemail",email);
  //   return this.http.get<boolean>(`${this.baseurl}/checkEmail/${email}`);
  //     }
  //     checkDuplicateWebMail(webMail:string):Observable<any> {
  //       return this.http.get<boolean>(`${this.baseurl}/checkWebMail/${webMail}`);

  //     }
  //     checkDuplicatePhoneNumber(phoneNumber:number):Observable<any> {
  //       return this.http.get<boolean>(`${this.baseurl}/checkPhoneNumber/${phoneNumber}`);

  //     }
  //     checkDuplicateEmailToUpdate(employeeId:string,email:string):Observable<any> {
  //       console.log("servicemethod checkduplicateemail",email);
  //       return this.http.get<boolean>(`${this.baseurl}/checkEmailToUpdate/${employeeId}/${email}`);
  //         }
  //         checkDuplicatePhoneNumberToUpdate(employeeId:string,phoneNumber:number):Observable<any> {
  //           return this.http.get<boolean>(`${this.baseurl}/checkPhoneNumberToUpdate/${employeeId}/${phoneNumber}`);

  //         }


  // }
  uploadTaskFile(taskId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'), // Include your authentication token here
    });

    return this.http.post(
      `${this.baseurl}/uploadTaskFile/${taskId}`,
      formData,
      { headers, responseType: 'text' }
    );
  }

  getTaskFile(taskId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'), // Include your authentication token here
    });

    return this.http.get(`${this.baseurl}/getTaskFile/${taskId}`, {
      headers,
      responseType: 'blob',
    });
  }
  getTotalTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseurl}/getTotalTask`);
  }

  createSession(session: Session): Observable<Session> {
    return this.http.post<Session>(`${this.baseurl}/createSession`, session);
  }

  getSessionsByTeamName(teamName: string): Observable<Session[]> {
    return this.http.get<Session[]>(
      `${this.baseurl}/getSessionsByTeamName/${teamName}`
    );
  }

  recordJoinTime(employeeId: string, meetingLink: string): Observable<void> {
    return this.http.post<void>(`${this.baseurl}/recordJoinTime`, {
      employeeId,
      meetingLink,
    });
  }

  recordLeaveTime(employeeId: string, meetingLink: string): Observable<void> {
    return this.http.post<void>(`${this.baseurl}/recordLeaveTime`, {
      employeeId,
      meetingLink,
    });
  }

  // updateSession(id: number, session: Session): Observable<Session> {
  //   return this.http.put<Session>(`${this.baseurl}/updateSession/${id}`, session);
  // }

  
  getSubCoursesByTeamName(teamName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/subCourses/${teamName}`);
  }

  // createSessions(teamName: string, subCourseName: string, numberOfSessions: number, dates: Date[], sessionDTO: any, endTime: any, meetingLink: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseurl}/sessions`, {
  //     teamName,
  //     subCourseName,
  //     numberOfSessions,
  //     dates,
  //     sessionDTO
  //   });
  // }
  createSessions(teamName: string, subCourseName: string, requestBody: any): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseurl}/createSessions/${encodeURIComponent(teamName)}/${encodeURIComponent(subCourseName)}`, requestBody, { headers });
  }
  updateSession(classId: number, session: any): Observable<any> {
    return this.http.put(`${this.baseurl}/sessions/${classId}`, session);
  }

 

  getAllEmails(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseurl}/AllEmails`);
  }
  getAllWebMails(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseurl}/AllWebMails`);
  }
  getAllPhoneNumbers(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseurl}/AllPhoneNumbers`);
  }
// get complete or incomplete status
  getTaskStatusCountByEmployeeId(employeeId: string): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseurl}/getTaskStatusCountByEmployeeId/${employeeId}`);
  }
}
