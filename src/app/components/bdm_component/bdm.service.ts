import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BdmClient } from 'src/app/Models/bdmClient';
import { Deployment } from 'src/app/Models/Deployment';
import { Employee } from 'src/app/Models/Employee';

@Injectable({
  providedIn: 'root',
})
export class BdmService {

  constructor(private http: HttpClient, private auth: AuthService) {}


  private baseurl = 'http://localhost:8081';

  private authToken = localStorage.getItem('authToken');

  // CREATE
  createItem(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/createClient`, data);
  }

  // READ
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/getAllClient`);
  }

  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/list/${id}`);
  }



  updateItem(companyId: string, clientDetails: any): Observable<any> {
    return this.http.put(`${this.baseurl}/updateClientDetails/${companyId}`, clientDetails)
      .pipe(
        catchError(this.handleError<any>('updateClientDetails'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);  // Log error to console
      return of(result as T);  // Let the app continue by returning an empty result
    };

  }

  // DELETE
  deleteItem(companyId: string): Observable<any> {
    return this.http.delete(`${this.baseurl}/deleteClient/${companyId}`, { responseType: 'text' });
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
}