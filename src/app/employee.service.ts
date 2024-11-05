import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Course } from './Models/Course';
import { Team } from './Models/Team';
import { SubCourse } from './Models/SubCourse';
import { Task } from './Models/Task';
import { Session } from './Models/Session';

import { SupportRequest } from './Models/SupportRequest';
import { AdminEvent } from './Models/AdminEvent';

import { Attendance } from './Models/Attendance';
import { Leave } from './Models/Leave';
import { BdmClient } from './Models/bdmClient';

import { EmployeeTaskStatus } from './Models/EmployeeTaskStatus';
import { Deployment } from './Models/deployment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getEmployeesByTeam(teamName: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private auth: AuthService) {}
  private baseurl = 'http://localhost:8082';

  private authToken = localStorage.getItem('authToken');

  // private baseurl = 'https://lms-backend-5e890b1bbe26.herokuapp.com';

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken(); // Fetch the token from AuthService
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

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

  getAllEmails(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseurl}/AllEmails`);
  }
  getAllWebMails(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseurl}/AllWebMails`);
  }
  getAllPhoneNumbers(): Observable<String[]> {
    return this.http.get<String[]>(`${this.baseurl}/AllPhoneNumbers`);
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
    return this.http.post<any>(`${this.baseurl}/login`, data);
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

  checkDuplicateEmployeeId(employeeId: any) {
    return this.http.get<boolean>(
      `${this.baseurl}/checkEmployeeId/${employeeId}`
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

  assignTasksToTeam(
    tasks: Task[],
    teamName: string,
    subCourse: string
  ): Observable<Task[]> {
    return this.http.post<Task[]>(
      `${this.baseurl}/assignTasksToTeam/${teamName}/${subCourse}`,
      tasks
    );
  }
  markSubCourseCompleted(subCourseName: string) {
    return this.http.put(`${this.baseurl}/${subCourseName}/complete`, null);
  }

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

  getSubCoursesByTeam(teamName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseurl}/getSubCoursesByTeam/${teamName}`
    );
  }

  createListOfSessions(
    teamName: string,
    subCourseName: string,
    requestBody: any
  ): Observable<any> {
    const url = `${this.baseurl}/createListOfSessions/${teamName}/${subCourseName}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    return this.http.post<any>(url, requestBody, { headers });
  }

  updateSession(classId: number, session: any): Observable<any> {
    return this.http.put(`${this.baseurl}/sessions/${classId}`, session);
  }
  public getSupportRequestById(ticketId: number) {
    return this.http.get<SupportRequest>(
      `${this.baseurl}/getSupportRequest/${ticketId}`
    );
  }
  public getAllSupportRequest(): Observable<SupportRequest[]> {
    return this.http.get<SupportRequest[]>(
      `${this.baseurl}/getAllSupportRequest`
    );
  }
  public updateSupportRequest(ticketId: number, request: SupportRequest) {
    return this.http.put<SupportRequest>(
      `${this.baseurl}/updateSupportRequest/${ticketId}`,
      request
    );
  }
  sendRequestReply(ticketId: number, employeeId: string, replyMsg: string) {
    return this.http.post<String>(
      `${this.baseurl}/sendRequestReply/${ticketId}/${employeeId}`,
      replyMsg
    );
  }
  public addEvent(event: Event): Observable<AdminEvent> {
    return this.http.post<AdminEvent>(`${this.baseurl}/addEvent`, event);
  }

  public getEventById(eventId: number) {
    return this.http.get<AdminEvent>(`${this.baseurl}/getEvent/${eventId}`);
  }
  public getAllEvents(): Observable<AdminEvent[]> {
    return this.http.get<AdminEvent[]>(`${this.baseurl}/getAllEvents`);
  }
  public updateEvent(eventId: number, event: AdminEvent) {
    return this.http.put<AdminEvent>(
      `${this.baseurl}/updateEvent/${eventId}`,
      event
    );
  }

  // get complete or incomplete status
  getTaskStatusCountByEmployeeId(
    employeeId: string
  ): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(
      `${this.baseurl}/getTaskStatusCountByEmployeeId/${employeeId}`
    );
  }

  getTeamByEmployeeId(employeeId: string): Observable<Team> {
    return this.http.get<Team>(
      `${this.baseurl}/getTeamByEmployeeId/${employeeId}`
    );
  }

  getSessionsByTeamName(teamName: string): Observable<Session[]> {
    return this.http.get<Session[]>(
      `${this.baseurl}/getSessionsByTeamName/${teamName}`
    );
  }

  addSupportRequest(request: SupportRequest): Observable<SupportRequest> {
    return this.http.post<SupportRequest>(
      `${this.baseurl}/addSupportRequest`,
      request
    );
  }

  getEmployeeCountByTeamLead(employeeId: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseurl}/getEmployeeCount/${employeeId}`
    );
  }

  createLeave(leave: any, employeeId: string): Observable<any> {
    const url = `${this.baseurl}/createLeave/${employeeId}`;
    return this.http.post<any>(url, leave, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error('Error creating leave:', error);
        return throwError(() => new Error('Error creating leave'));
      })
    );
  }

  getAllLeaves(): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.baseurl}/getAllLeaves`);
  }

  getLeaveById(leaveId: number): Observable<Leave> {
    return this.http.get<Leave>(`${this.baseurl}/getLeave/${leaveId}`);
  }

  updateLeave(leaveData: Leave) {}
  updateLeaveStatus(leaveId: number, status: string): Observable<Leave> {
    const params = new HttpParams().set('status', status);
    return this.http.put<Leave>(
      `${this.baseurl}/updateLeaveStatus/${leaveId}`,
      null,
      { params }
    );
  }
  approveLeave(leaveId: number): Observable<Leave> {
    return this.http.post<Leave>(`${this.baseurl}/${leaveId}/approve`, {});
  }

  rejectLeave(leaveId: number): Observable<Leave> {
    return this.http.post<Leave>(`${this.baseurl}/${leaveId}/reject`, {});
  }
  saveAttendance(employeeId: string): Observable<Attendance> {
    const params = new HttpParams().set('employeeId', employeeId);
    return this.http.post<Attendance>(`${this.baseurl}/saveAttendance`, null, {
      params,
    });
  }

  // Check out and update attendance
  checkOut(attendanceId: number): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.baseurl}/checkout`, null, {
      params: new HttpParams().set('id', attendanceId.toString()),
    });
  }

  // Get attendance by employee ID
  // getAttendanceByEmployeeId(employeeId: string): Observable<Attendance> {
  //   return this.http.get<Attendance>(`${this.baseurl}/getAttendanceByEmployeeId/${employeeId}`);
  // }
  getAttendanceByEmployeeId(employeeId: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${this.baseurl}/getAttendanceByEmployeeId/${employeeId}`
    );
  }

  // Update attendance status (to be called periodically or manually)
  updateAttendanceStatus(): Observable<void> {
    return this.http.put<void>(`${this.baseurl}/update-status`, {});
  }

  getAttendanceStatus(employeeId: string): Observable<Attendance> {
    return this.http.get<Attendance>(
      `${this.baseurl}/getAttendanceStatus/${employeeId}`
    );
  }

  markSessionAsAttended(
    sessionId: number,
    employeeId: string
  ): Observable<void> {
    // New: Mark session as attended
    return this.http.post<void>(
      `${this.baseurl}/markSessionAsAttended/${sessionId}/${employeeId}`,
      {}
    );
  }

  calculateAttendancePercentage(employeeId: string): Observable<number> {
    // New: Calculate attendance percentage
    return this.http.get<number>(
      `${this.baseurl}/calculateAttendancePercentage/${employeeId}`
    );
  }

  getTotalSessions(employeeId: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseurl}/getTotalSessions/${employeeId}`
    );
  }

  getAttendedSessions(employeeId: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseurl}/getAttendedSessions/${employeeId}`
    );
  }

  // getSessionsBySubCourse(
  //   teamName: string,
  //   subCourseName: string
  // ): Observable<Session[]> {
  //   const url = `${this.baseurl}/getSessionsBySubCourse/${teamName}/${subCourseName}`;
  //   return this.http.get<Session[]>(url);
  // }

  // employee.service.ts
  getSessionsBySubCourse(
    teamName: string,
    subCourseName: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseurl}/getSessionsBySubCourse/${teamName}/${subCourseName}`
    );
  }

  countCompletedTasksByEmployeeId(employeeId: string): Observable<number> {
    return this.http.get<number>(
      `${this.baseurl}/countCompletedTasksByEmployeeId/${employeeId}`
    );
  }

  addDeploymentStatus(
    employeeId: string,
    deploymentStatus: string
  ): Observable<Deployment> {
    return this.http.post<Deployment>(
      `${this.baseurl}/addDeploymentStatus/${employeeId}/${deploymentStatus}`,
      {}
    );
  }

  getTeamLeadEmployees(teamLeadId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseurl}/getTeamLeadEmployees/${teamLeadId}`
    );
  }

  getDeploymentsByTeamLead(teamLeadId: string): Observable<Deployment[]> {
    return this.http.get<Deployment[]>(
      `${this.baseurl}/getDeploymentsByTeamLead/${teamLeadId}`
    );
  }

  updateDeploymentStatus(
    deploymentId: number,
    status: string
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseurl}/status?deploymentId=${deploymentId}&status=${status}`,
      {}
    );
  }

  getAllEmployeesByTeamLead(teamLeadId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.baseurl}/getAllEmployeesByTeamLead/${teamLeadId}`
    );
  }

<<<<<<< HEAD
  sendConfirmationMail(email: string): void {


    // this.http.post('/api/mail/sendConfirmation', {
    //   recipientEmail: email,
    //   googleFormLink: googleFormUrl
    // }).subscribe(
    //   () => {
    //     alert("Confirmation mail sent successfully!");
    //   },
    //   error => {
    //     console.error("Failed to send mail", error);
    //     alert("Failed to send confirmation mail.");
    //   }
    // );
=======
   // Method to fetch total task count by employee ID
   getTaskCountByEmployeeId(employeeId: string): Observable<number> {
    return this.http.get<number>(`${this.baseurl}/taskNumberEmployee/${employeeId}`);
>>>>>>> 0e1fd2e5ba7cdb8ab03115ab36d0ef4fb84f941b
  }
}
