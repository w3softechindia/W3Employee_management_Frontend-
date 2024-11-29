import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BdmClient } from 'src/app/Models/bdmClient';
import { DeployedCandidates } from 'src/app/Models/DeployedCandidates';

import { Deployment } from 'src/app/Models/deployment';
import { DeploymentStatus } from 'src/app/Models/deployment-status';

import { Employee } from 'src/app/Models/Employee';
import { RejectedCandidates } from 'src/app/Models/RejectedCandidates';

@Injectable({
  providedIn: 'root',
})
export class BdmService {

  
constructor(private http: HttpClient, private auth: AuthService) {}


  // private baseurl = 'http://localhost:8082';

  private baseurl = 'https://lms-backend-5e890b1bbe26.herokuapp.com';


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
  
  

  // Fetch employee details by employee ID
  getEmployeeDetails(employeeId: string): Observable<any> {
    const url = `${this.baseurl}/details/${employeeId}`; // Replace with actual API endpoint
    return this.http.get<any>(url);
  }

  // Delete an employee (example)
  deleteEmployeeFromTeam(employeeId: string): Observable<any> {
    const url = `${this.baseurl}/deleteEmployee/${employeeId}`; // Replace with actual API endpoint
    return this.http.delete<any>(url);
  }
  getRejectedEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getRejectedemployees`);
}
pdateInterview(clientId: any, selectedInterview: any) {
  throw new Error('Method not implemented.');
}

updateInterview(clientId: string, selectedInterview: any): Observable<any> {
  const url = `${this.baseurl}/interviews/${clientId}`; // Assuming this is the correct API endpoint for updating
  return this.http
    .put(url, selectedInterview) // PUT request to update interview
    .pipe(catchError(this.handleError<any>('updateInterview')));
}

// Method to delete an interview
deleteInterview(clientId: string, interview: any): Observable<any> {
  const url = `${this.baseurl}/interviews/${clientId}`; // Assuming this is the correct API endpoint for deleting
  return this.http
    .delete(url, { body: interview }) // DELETE request with interview data in the request body
    .pipe(catchError(this.handleError<any>('deleteInterview')));
}
getInterviews() {
  return this.http.get<any[]>(`${this.baseurl}/rejectedEmployees`);
  
}

  // Fetch employees by role and experience
getEmployeesByRoleAndExperience(role: string, experience: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseurl}/employees/role/${role}/experience/${experience}`);
}

// Fetch employees by role, status, and experiences
getEmployeesByRoleStatusAndExperience(role: string, status: string, experience: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseurl}/employees/${role}/${status}/experience/${experience}`);
}


sendEmail(emailData: { subject: string, body: string, employeeIds: string[] }) {
  return this.http.post(`${this.baseurl}/send-email`, emailData);
  
}


  // Method to fetch deployment statuses for Testers
  getTestersDeploymentStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/deploymentStatus/testers`);
  }

  // Method to fetch deployment statuses for Developers
  getDevelopersDeploymentStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/deploymentStatus/developers`);
  }


  editDeploymentStatus(deploymentId: string, deploymentStatus: DeploymentStatus): Observable<DeploymentStatus> {
    const url = `${this.baseurl}/deploySave/${deploymentId}`;  // Include the deploymentId in the URL
    return this.http.put<DeploymentStatus>(url, deploymentStatus);
}

deleteDeploymentStatus(deploymentId: number): Observable<void> {
  const url = `${this.baseurl}/deleteDeploymentStatus/${deploymentId}`;
  return this.http.delete<void>(url);
}

  // Save deployed candidate data
  saveDeployedCandidate(deployedCandidate: any): Observable<any> {
    return this.http.post(`${this.baseurl}/bdm-DeployedCandidates`, deployedCandidate);
  }

  // Save rejected candidate data
  saveRejectedCandidate(rejectedCandidate: any): Observable<any> {
    return this.http.post(`${this.baseurl}/rejected-candidates`, rejectedCandidate);
  }


  getRejectedCandidatesByRole(role: string): Observable<RejectedCandidates[]> {
    return this.http.get<RejectedCandidates[]>(`${this.baseurl}/rejected-candidates/role/${role}`);
  }

   // Method to delete rejected candidate by rejectionId
   deleteRejectedCandidate(rejectionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/rejected-candidates/${rejectionId}`);
  }


    // Fetch deployed candidates by role
    getDeployedCandidatesByRole(role: string): Observable<DeployedCandidates[]> {
      return this.http.get<DeployedCandidates[]>(`${this.baseurl}/deployed-candidates/role/${role}`);
    }

    
  // Method to delete deployed candidate by deployedId
  deleteDeployedCandidate(deployedId: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/delete-deployed-candidates/${deployedId}`);
  }

 
  // Method to fetch employee details by ID
  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseurl}/bdm-employee/${employeeId}`);
  }

  updateDeployedCandidateDateOfJoin(candidate: DeployedCandidates): Observable<any> {
    return this.http.put(`${this.baseurl}/updateDeployedCandidateDateOfJoin`, candidate, { responseType: 'text' });
  }

  // Ensure the method returns an Observable
  getLeavesByEmployeeId(employeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/bdm-getLeavesByEmployeeId/${employeeId}`);
  }


    // Fetch testers data
    fetchTesters(): Observable<any[]> {
      const url = `${this.baseurl}/getAllTesters/testers`;
      return this.http.get<any[]>(url);
    }
  
    // Fetch developers data
    fetchDevelopers(): Observable<any[]> {
      const url = `${this.baseurl}/getAllDevelopers/developers`;
      return this.http.get<any[]>(url);
    }
  

}






  
  

  




 



