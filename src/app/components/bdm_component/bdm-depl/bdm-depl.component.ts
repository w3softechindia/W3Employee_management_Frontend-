import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/Models/Employee';
import { Deployment } from 'src/app/Models/deployment';


@Component({
  selector: 'app-bdm-depl',
  templateUrl: './bdm-depl.component.html',
  styleUrls: ['./bdm-depl.component.scss'],
})
export class BdmDeplComponent implements OnInit {
  goodEmployees: Deployment[] = [];
  averageEmployees: Deployment[] = [];
  poorEmployees: Deployment[] = [];
  selectedEmployee: Employee | null = null;
  isModalOpen: boolean = false;

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
        this.poorEmployees = data;
      },
      (error) => {
        console.error('Error fetching poor employees:', error);
      }
    );
  }

  showEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEmployee = null;
  }
}
