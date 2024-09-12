import { Component, OnInit } from '@angular/core'; // Adjust the path as needed
import { BdmService } from '../bdm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';
import { Deployment } from 'src/app/Models/Deployment';

@Component({
  selector: 'app-bdm-depl',
  templateUrl: './bdm-depl.component.html',
  styleUrls: ['./bdm-depl.component.scss']
})
export class BdmDeplComponent implements OnInit {
  goodEmployees: Deployment[];
  averageEmployees: Deployment[] = [];
  poorEmployees: Deployment[] = [];

  constructor(
    private bdmService: BdmService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadGoodEmployees();
    this.loadAverageEmployees();
    this.loadPoorEmployees();
  }

  loadGoodEmployees(): void {
    this.bdmService.getGoodEmployees().subscribe(
      (data) => {
        console.log('Good Employees:', data);
        this.goodEmployees = data;
      },
      (error) => {
        console.error('Error fetching good employees:', error);
      }
    );
  }

  loadAverageEmployees(): void {
    this.bdmService.getAverageEmployees().subscribe(
      (data) => {
        console.log('Average Employees:', data);
        this.averageEmployees = data;
      },
      (error) => {
        console.error('Error fetching average employees:', error);
      }
    );
  }

  loadPoorEmployees(): void {
    this.bdmService.getPoorEmployees().subscribe(
      (data) => {
        console.log('Poor Employees:', data);
        this.poorEmployees = data;
      },
      (error) => {
        console.error('Error fetching poor employees:', error);
      }
    );
  }
}
