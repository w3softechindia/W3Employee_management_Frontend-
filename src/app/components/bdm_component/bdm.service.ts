import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BdmService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  private baseurl = 'http://localhost:5000';

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

    
  
}