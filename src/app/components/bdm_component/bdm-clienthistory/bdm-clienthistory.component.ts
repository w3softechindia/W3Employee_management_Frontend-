import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';

@Component({
  selector: 'app-bdm-clienthistory',
  templateUrl: './bdm-clienthistory.component.html',
  styleUrls: ['./bdm-clienthistory.component.scss']
})
export class BdmClienthistoryComponent implements OnInit {

  deploymentData: any[] = []; // Holds the fetched data
  role: string = ''; 

  constructor(private http: HttpClient,private bdmService: BdmService) {}

  ngOnInit(): void {
    // Optionally fetch default data on load
    this.fetchDeploymentData('Tester');
  }



  fetchDeploymentData(role: string): void {
    this.role = role;

    this.bdmService.fetchDeploymentDataByRole(role).subscribe({
      next: (data) => {
        this.deploymentData = this.transformData(data);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  transformData(data: any[]): any[] {
    // Transform data if necessary
    return data.map(client => ({
      clientName: client.clientName,
      dateOfJoin: client.dateOfJoin,
      employees: client.employees || [] // Default to empty array if undefined
    }));
  }
}
