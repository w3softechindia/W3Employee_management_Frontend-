import { Component } from '@angular/core';
import { BdmService } from '../bdm.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-bdm-information',
  templateUrl: './bdm-information.component.html',
  styleUrls: ['./bdm-information.component.scss']
})
export class BdmInformationComponent {

  employees: any[] = [];
  activeButton: string = 'testers'; // Track the active button (default is 'testers')

  constructor(private bdmService: BdmService,) { }

  ngOnInit(): void {
    // this.fetchEmployees();
    this.filterTesters();  // Load testers by default
  }

  // fetchEmployees(): void {
  //   this.bdmService.getEmployees().subscribe(
  //     (data) => {
  //       // Map relevant fields here
  //       this.employees = data.map((employee: any) => ({
  //         employeeId: employee.employeeId,
  //         fullName: `${employee.firstName} ${employee.lastName}`,
  //         roles: employee.roles.map((role: any) => role.roleName), 
  //         dateOfJoin: employee.dateOfJoin || 'N/A',
  //         status: employee.status || 'N/A'
  //       }));

  //     },
  //     (error) => {
  //       console.error('Error fetching employees:', error);
  //     }
  //   );
  // }




  filterTesters(): void {
    this.activeButton = 'testers'; // Set active button to 'testers'
    this.bdmService.getTesters().subscribe(
      (data: any[]) => {
        this.employees = data.map(employee => ({
          employeeId: employee.employeeId,
          fullName: `${employee.firstName} ${employee.lastName}`,
          dateOfJoin: employee.dateOfJoin || 'N/A',
          status: employee.status,
          address: employee.address,
          phoneNumber: employee.phoneNumber,
          roles: employee.roles.length > 0 ? [employee.roles[0]] : [],
          employeeEmail: employee.employeeEmail,
          clientName: employee.clientName || 'N/A',
          clientLocation: employee.clientLocation || 'N/A',


        }));
      },
      (error) => {
        console.error('Error fetching testers:', error);
      }
    );
  }

  filterDevelopers(): void {
    this.activeButton = 'developers'; // Set active button to 'developers'
    this.bdmService.getDevelopers().subscribe(
      (data: any[]) => {
        this.employees = data.map(employee => ({
          employeeId: employee.employeeId,
          fullName: `${employee.firstName} ${employee.lastName}`,
          dateOfJoin: employee.dateOfJoin || 'N/A',
          status: employee.status,
          address: employee.address,
          phoneNumber: employee.phoneNumber,
          employeeEmail: employee.employeeEmail,
          roles: employee.roles.length > 0 ? [employee.roles[0]] : [],
          clientName: employee.clientName || 'N/A',
          clientLocation: employee.clientLocation || 'N/A',
        }));
      },
      (error) => {
        console.error('Error fetching developers:', error);
      }
    );
  }


  selectedEmployee: any;


  openEmployeeModal(employee: any) {
    this.selectedEmployee = employee;
    console.log(this.selectedEmployee);
    const modalElement = document.getElementById('employeeModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  editEmployee(employee: any) {
    // Open edit form modal or navigate to an edit page
    console.log('Editing employee:', employee);
    // Implement edit functionality here
  }

  deleteEmployee(employee: any) {
   
        console.log('Employee deleted successfully');
     
  }
}
