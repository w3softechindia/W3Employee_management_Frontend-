// import { Component } from '@angular/core';
// import { BdmService } from '../bdm.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-bdm-details',
//   templateUrl: './bdm-details.component.html',
//   styleUrls: ['./bdm-details.component.scss']
// })
// export class BdmDetailsComponent {

//   clients: any[] = []; 
//   selectedStatus: string = '';
//   selectedRole: string = '';
//   employeeList: any[] = [];
//   selectedEmployee: string = ''; 
//   employeeDetails: any;

//   constructor(private clientService: BdmService,private http: HttpClient) { }

//   ngOnInit(): void {
//     this.getClients();
  
//   }

//   getClients() {
//     this.clientService.getAllClients().subscribe((data: any[]) => {
//       this.clients = data; // Store the data in the clients array
//     }, (error) => {
//       console.error('Error fetching clients:', error);
//     });
//   }


//   fetchEmployeeDetails() {
//     if (this.selectedStatus && this.selectedRole) {
//       this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus)
//         .subscribe((response: any) => {
//           this.employeeList = response; // Set employee list
//         });
//     } else {
//       console.log('Please select both status and role.');
//     }
//   }

//   fetchDetailsForSelectedEmployee() {
//     if (this.selectedEmployee) {
//       this.clientService.getEmployeeDetails(this.selectedEmployee)
//         .subscribe((response: any) => {
//           this.employeeDetails = response; // Set employee details for display
//         });
//     }
//   }

//   isFormValid: boolean = false;

//   checkFormValidity(): void {
//     this.isFormValid = this.selectedStatus !== '' && this.selectedRole !== '';
//   }


// }


import { Component } from '@angular/core';
import { BdmService } from '../bdm.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bdm-details',
  templateUrl: './bdm-details.component.html',
  styleUrls: ['./bdm-details.component.scss']
})
export class BdmDetailsComponent {

  clients: any[] = [];
  selectedStatus: string = '';
  selectedRole: string = '';
  employeeList: any[] = [];
  selectedEmployee: string = '';
  employeeDetails: any;
  selectedClient: number = 0; // Added to store selected client ID
  isFormValid: boolean = false;

  constructor(private clientService: BdmService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getAllClients().subscribe((data: any[]) => {
      this.clients = data;
    }, (error) => {
      console.error('Error fetching clients:', error);
    });
  }

  fetchEmployeeDetails() {
    if (this.selectedStatus && this.selectedRole) {
      this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus)
        .subscribe((response: any) => {
          this.employeeList = response;
        });
    } else {
      console.log('Please select both status and role.');
    }
  }

  fetchDetailsForSelectedEmployee() {
    if (this.selectedEmployee) {
      this.clientService.getEmployeeDetails(this.selectedEmployee)
        .subscribe((response: any) => {
          this.employeeDetails = response;
        });
    }
  }

  checkFormValidity(): void {
    this.isFormValid = this.selectedStatus !== '' && this.selectedRole !== '' && this.selectedClient !== 0 && this.selectedEmployee !== '';
  }

  // New method to submit form and add employee to client
  onSubmit() {
    if (this.selectedClient && this.selectedEmployee) {
      // Show confirmation popup
      Swal.fire({
        title: 'Confirm Action',
        text: `Are you sure you want to add employee ${this.selectedEmployee} to client ${this.selectedClient}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, add!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the service method to add the employee to the client
          this.clientService.addEmployeeToClient(this.selectedClient, this.selectedEmployee)
            .subscribe((response) => {
              Swal.fire('Added!', 'The employee has been added to the client.', 'success');
            }, (error) => {
              console.error('Error adding employee to client:', error);
              Swal.fire('Error!', 'Failed to add the employee to the client.', 'error');
            });
        }
      });
    }
  }
}
