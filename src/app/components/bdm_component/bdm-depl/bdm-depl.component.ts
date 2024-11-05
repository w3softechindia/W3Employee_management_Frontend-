import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/Models/Employee';
import { Deployment } from 'src/app/Models/deployment';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-bdm-depl',
  templateUrl: './bdm-depl.component.html',
  styleUrls: ['./bdm-depl.component.scss'],
})
export class BdmDeplComponent implements OnInit {
  // goodEmployees: Deployment[] = [];
  // averageEmployees: Deployment[] = [];
  // poorEmployees: Deployment[] = [];
  // selectedEmployee: Employee | null = null;
  // isModalOpen: boolean = false;
  selectedRole = 'Tester';
  isModalOpen = false;
  selectedEmployee: any;
  goodEmployees: Employee[] = [];
  averageEmployees: Employee[] = [];
  poorEmployees: Employee[] = [];

 

  constructor(
    private bdmService: BdmService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.loadGoodEmployees();
    // this.loadAverageEmployees();
    // this.loadPoorEmployees();
    // this.fetchEmployees();
    this.fetchTesters(); 
   
  }

  // loadGoodEmployees(): void {
  //   this.bdmService.getGoodEmployees().subscribe(
  //     (data) => {
  //       this.goodEmployees = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching good employees:', error);
  //     }
  //   );
  // }

  // loadAverageEmployees(): void {
  //   this.bdmService.getAverageEmployees().subscribe(
  //     (data) => {
  //       this.averageEmployees = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching average employees:', error);
  //     }
  //   );
  // }

  // loadPoorEmployees(): void {
  //   this.bdmService.getPoorEmployees().subscribe(
  //     (data) => {
  //       this.poorEmployees = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching poor employees:', error);
  //     }
  //   );
  // }

  showEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEmployee = null;
  }



    // Fetch testers data
    fetchTesters() {
      this.http.get<any[]>('http://localhost:8082/getAllTesters/testers').subscribe(
        (data) => {
          this.filterEmployees(data);
        },
        (error) => {
          console.error('Error fetching testers:', error);
        }
      );
    }
  
    // Fetch developers data
    fetchDevelopers() {
      this.http.get<any[]>('http://localhost:8082/getAllDevelopers/developers').subscribe(
        (data) => {
          this.filterEmployees(data);
        },
        (error) => {
          console.error('Error fetching developers:', error);
        }
      );
    }
  
    // Handle button click to select role and fetch corresponding data
    selectRole(role: string) {
      this.selectedRole = role;
      if (role === 'Tester') {
        this.fetchTesters();
      } else {
        this.fetchDevelopers();
      }
    }
  
    // Filter employees by their status
    filterEmployees(employees: any[]) {
      this.goodEmployees = employees.filter(emp => emp.status === 'Good');
      this.averageEmployees = employees.filter(emp => emp.status === 'Average');
      this.poorEmployees = employees.filter(emp => emp.status === 'Poor');
    }



}
