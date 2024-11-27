import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-rms-employee-list',
  templateUrl: './rms-employee-list.component.html',
  styleUrls: ['./rms-employee-list.component.scss']
})
export class RmsEmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getAllRMSEmployees();
  }

  getAllRMSEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAllRMSEmployees().subscribe(
      (res: Employee[]) => {
        this.employees = res;
        console.log('All RMS Employees:', this.employees);
        this.employees.forEach(employee => {
          this.loadPhoto(employee);
        });
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching employees:', error);
        this.isLoading = false;
      }
    );
  }

  showEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  hideEmployeeDetails(): void {
    this.selectedEmployee = null;
  }

  loadPhoto(employee: Employee): void {
    this.employeeService.getPhotoAdmin(employee.employeeId).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          employee.photoUrl = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        employee.photoUrl = 'assets/default-profile.png'; // Default image for missing photos
      }
    );
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  gotoDeveloper(): void {
    this.router.navigate(['/developer-employees']);
  }

  gotoTeamLead(): void {
    this.router.navigate(['/teamlead-employees']);
  }

  gotoTester(): void {
    this.router.navigate(['/tester-employees']);
  }

}
