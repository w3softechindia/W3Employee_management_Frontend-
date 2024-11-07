import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DeploymentStatus } from 'src/app/Models/deployment-status';

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
  selectedEmployeeName: string;
  selectedEmployees: string[] = []; // Array to hold multiple employee IDs

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

  checkFormValidity() {
    this.isFormValid = this.selectedStatus !== '' && this.selectedRole !== '' && this.selectedClient !== null;
    // if (this.isFormValid) {
    //   this.fetchEmployeeDetails();
    // }
    this.fetchEmployeeDetails();
  }


  fetchEmployeeDetails() {
    // If 'All' status is selected, fetch all employees for the selected role
    if (this.selectedStatus === 'All') {
      this.clientService.getEmployeesByRole(this.selectedRole).subscribe((data) => {
        this.employeeList = data;
        console.log(data);
      }, (error) => {
        console.error('Error fetching all employees:', error);
      });
    } else {
      // Fetch employees filtered by role and status
      this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus).subscribe((data) => {
        this.employeeList = data;
      }, (error) => {
        console.error('Error fetching employees:', error);
      });
    }
  }

  // fetchEmployeeDetails() {
  //   this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus).subscribe((data) => {
  //     this.employeeList = data;
  //   }, (error) => {
  //     console.error('Error fetching employee details:', error);
  //   });
  // }

  // onSubmit() {
  //   if (this.selectedEmployee && this.selectedClient !== null) {
  //     // Cast selectedClient to number
  //     this.clientService.addEmployeeToClient(this.selectedClient as unknown as number, this.selectedEmployee).subscribe(() => {
  //       Swal.fire({
  //         title: 'Success!',
  //         text: `Email sent to employee ID: ${this.selectedEmployee}`,
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       });
  //     }, (error) => {
  //       console.error('Error adding employee to client:', error);
  //     });
  //   } else {
  //     // Handle the case when selections are invalid (optional)
  //     Swal.fire({
  //       title: 'Error!',
  //       text: 'Please select both a client and an employee.',
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //   }
  // }


onSubmit() {
  // Check if client, employees, and status are selected
  if (this.selectedClient && this.selectedEmployees.length > 0 && this.selectedStatus) {
    // Iterate over selected employee IDs
    this.selectedEmployees.forEach(employeeId => {
      // Find the employee name based on employeeId from the employeeList
      const employee = this.employeeList.find(emp => emp.employeeId === employeeId);
      const employeeName = employee ? employee.firstName + " " + employee.lastName : '';

      // Create the deployment status object with selected employees
      const deploymentStatus: DeploymentStatus = {
        clientId: Number(this.selectedClient),
        clientName: '',
        employeeId: employeeId,  // Assign the employee ID
        status: this.selectedStatus,  // Set the selected status
        role: this.selectedRole,  // Set the role
        additionalInfo: this.additionalInfo || '',  // Set additional info
        employeeName: employeeName,  // Set employee name
      };

      console.log("Sending deployment status for employee:", deploymentStatus);

      // Call the service to save deployment status for each selected employee
      this.clientService.addDeploymentStatus(deploymentStatus).subscribe(
        (response) => {
          console.log('Deployment status saved successfully for employee:', response);
          
          // After saving deployment status, proceed with the next task (like adding employee to client)
          this.addEmployeeToClient(employeeId);
        },
        (error) => {
          console.error('Error saving deployment status for employee:', error);
          this.showErrorMessage('There was an error saving the deployment status for this employee.');
        }
      );
    });
  } else {
    this.showErrorMessage('Please select both a client, employee(s), and status.');
  }
}

addEmployeeToClient(employeeId: string) {
  // Add employee to client after saving deployment status
  this.clientService.addEmployeeToClient(Number(this.selectedClient), employeeId).subscribe(
    () => {
      Swal.fire({
        title: 'Success!',
        text: `Employee ID: ${employeeId} added to client successfully.`,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.resetForm(); // Reset form after success
      });
    },
    (error) => {
      console.error('Error adding employee to client:', error);
      Swal.fire({
        title: 'Error!',
        text: `There was an error adding employee ID: ${employeeId} to the client.`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}

resetForm() {
  // Reset form fields to their initial values
  this.selectedClient = '';
  this.selectedEmployees = [];
  this.selectedStatus = '';
  this.selectedRole = '';
  this.additionalInfo = '';
}

showErrorMessage(message: string) {
  Swal.fire({
    title: 'Error!',
    text: message,
    icon: 'error',
    confirmButtonText: 'OK'
  });
}


  // // Assuming you have an 'employeeList' array with employee details
  onEmployeeSelected() {
    const selectedEmp = this.employeeList.find(emp => emp.employeeId === this.selectedEmployee);
    if (selectedEmp) {
      this.selectedEmployeeName = selectedEmp.firstName; // Set employeeName based on selected employee
    }
  }




}
