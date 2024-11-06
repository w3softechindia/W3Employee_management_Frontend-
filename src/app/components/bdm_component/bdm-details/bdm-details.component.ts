import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bdm-details',
  templateUrl: './bdm-details.component.html',
  styleUrls: ['./bdm-details.component.scss']
})
export class BdmDetailsComponent implements OnInit {
  clients: any[] = [];
  selectedStatus: string = '';
  selectedRole: string = '';
  // selectedClient: number | null = null;
  selectedClient: string = ''; 
  employeeList: any[] = [];
  selectedEmployee: string = '';
  additionalInfo: string = '';
  isFormValid: boolean = false;

  constructor(private clientService: BdmService, private http: HttpClient) {}

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

  checkFormValidity() {
    this.isFormValid = this.selectedStatus !== '' && this.selectedRole !== '' && this.selectedClient !== null;
    // if (this.isFormValid) {
    //   this.fetchEmployeeDetails();
    // }
    this.fetchEmployeeDetails();
  }

  fetchEmployeeDetails() {
    this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus).subscribe((data) => {
      this.employeeList = data;
    }, (error) => {
      console.error('Error fetching employee details:', error);
    });
  }

  onSubmit() {
    if (this.selectedEmployee && this.selectedClient !== null) {
      // Cast selectedClient to number
      this.clientService.addEmployeeToClient(this.selectedClient as unknown as number, this.selectedEmployee).subscribe(() => {
        Swal.fire({
          title: 'Success!',
          text: `Email sent to employee ID: ${this.selectedEmployee}`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }, (error) => {
        console.error('Error adding employee to client:', error);
      });
    } else {
      // Handle the case when selections are invalid (optional)
      Swal.fire({
        title: 'Error!',
        text: 'Please select both a client and an employee.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  
}
