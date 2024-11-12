import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BdmClient } from 'src/app/Models/bdmClient';

import { Deployment } from 'src/app/Models/deployment';
import { DeploymentStatus } from 'src/app/Models/deployment-status';

import { Employee } from 'src/app/Models/Employee';

@Injectable({
  providedIn: 'root',
})
export class BdmService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  // private baseurl = 'http://localhost:8082';

  private authToken = localStorage.getItem('authToken');

  // CREATE
  createItem(data: any): Observable<any> {

    return this.http.post(`${this.baseurl}/createClient`, data);
  }

  // READ
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getAllClient`);
  }
  getItem(companyId: any): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/getClientDetails/${companyId}`);
  }

  updateItem(companyId: string, clientDetails: any): Observable<any> {
    return this.http
      .put(`${this.baseurl}/updateClientDetails/${companyId}`, clientDetails)
      .pipe(catchError(this.handleError<any>('updateClientDetails')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(`${operation} failed: ${error.message}`);  // Log error to console
      return of(result as T);


    };
  }

  // DELETE
  deleteItem(companyId: string): Observable<any> {
    return this.http.delete(`${this.baseurl}/deleteClient/${companyId}`, {
      responseType: 'text',
    });
  }

  // Get Client BDM
  getClientDetails(companyId: string): Observable<BdmClient> {
    const url = `${this.baseurl}/getClientDetails/${companyId}`;
    return this.http.get<BdmClient>(url);
  }

  // Update client details by companyId
  updateClientDetails(
    companyId: string,
    client: BdmClient
  ): Observable<BdmClient> {
    const url = `${this.baseurl}/updateClientDetails/${companyId}`;
    return this.http.put<BdmClient>(url, client, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Reset client password
  resetClientPassword(
    companyId: string,
    currentPassword: string,
    newPassword: string
  ): Observable<BdmClient> {
    const url = `${this.baseurl}/resetClientPassword/${companyId}/${currentPassword}/${newPassword}`;
    return this.http.put<BdmClient>(url, null); // No body needed, just pass null

  }
  getGoodEmployees(): Observable<Deployment[]> {
    return this.http.get<Deployment[]>(`${this.baseurl}/getGoodEmployees`);
  }

  getAverageEmployees(): Observable<Deployment[]> {
    return this.http.get<Deployment[]>(`${this.baseurl}/getAverageEmployees`);
  }


  getPoorEmployees(): Observable<Deployment[]> {
    return this.http.get<Deployment[]>(`${this.baseurl}/getPoorEmployees`);
  }


  // Fetch employees based on role and status
  getEmployeesByRoleAndStatus(role: string, status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/employees/${role}/${status}`);
  }

  // Method to get employees based on role
    getEmployeesByRole(role: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseurl}/employees/role/${role}`);
    }

  // Fetch employee details by employeeId
  getEmployeeDetails(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/details/${employeeId}`);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.baseurl}/getAllClient`);
  }


 
  // get Employess to fetch in BDM Deployment Details

  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseurl}/getAllEmployeesInBdm`);
  }

  // Fetch testers
  getTesters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getAllTesters/testers`);
  }

  // Fetch developers (assuming you have this API)
  getDevelopers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getAllDevelopers/developers`);
  }


  getTestersByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getAllTesters/testers/${status}`);
  }

   // Method to add deployment status
   addDeploymentStatus(deploymentStatus: DeploymentStatus): Observable<DeploymentStatus> {
    return this.http.post<DeploymentStatus>(`${this.baseurl}/deploySave`, deploymentStatus);
  }


  //for sending mail to Client
  addEmployeeToClient(companyId: number, employeeId: string): Observable<any> {
    return this.http.post(
      `${this.baseurl}/addEmployeeToBdmClient/${companyId}/${employeeId}`,
      {}
    );
  }

  saveDeploymentStatuses(deploymentStatuses: any) {
    return this.http.post(`${this.baseurl}/deploySaveAll`, deploymentStatuses);
  }


  // Fetch employees by role and experience
getEmployeesByRoleAndExperience(role: string, experience: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseurl}/employees/role/${role}/experience/${experience}`);
}

// Fetch employees by role, status, and experiences
getEmployeesByRoleStatusAndExperience(role: string, status: string, experience: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseurl}/employees/${role}/${status}/experience/${experience}`);
}

// sendEmail(emailData: { subject: string, body: string, employeeIds: string[] }) {
//   return this.http.post('http://localhost:8082/send-email', emailData);
// }

sendEmail(emailData: { subject: string, body: string, employeeIds: string[], client: BdmClient }) {
  return this.http.post('http://localhost:8082/send-email', emailData);
}


}

