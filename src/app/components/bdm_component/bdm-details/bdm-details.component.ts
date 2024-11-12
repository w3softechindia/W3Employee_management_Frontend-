import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DeploymentStatus } from 'src/app/Models/deployment-status';
import { BdmClient } from 'src/app/Models/bdmClient';

@Component({
  selector: 'app-bdm-details',
  templateUrl: './bdm-details.component.html',
  styleUrls: ['./bdm-details.component.scss']
})
export class BdmDetailsComponent implements OnInit {
  [x: string]: any;
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
  selectedEmployees: string[] = []; 
  selectedExperience: string = '';
  emailSubject: string ='';

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

//--------original---
  // fetchEmployeeDetails() {
  //   // If 'All' status is selected, fetch all employees for the selected role
  //   if (this.selectedStatus === 'All') {
  //     this.clientService.getEmployeesByRole(this.selectedRole).subscribe((data) => {
  //       this.employeeList = data;
  //       console.log(data);
  //     }, (error) => {
  //       console.error('Error fetching all employees:', error);
  //     });
  //   } else {
  //     // Fetch employees filtered by role and status
  //     this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus).subscribe((data) => {
  //       this.employeeList = data;
  //     }, (error) => {
  //       console.error('Error fetching employees:', error);
  //     });
  //   }
  // }



  fetchEmployeeDetails() {
    if (this.selectedStatus === 'All' && this.selectedExperience) {
      // Fetch all employees for the selected role and experience
      this.clientService.getEmployeesByRoleAndExperience(this.selectedRole, this.selectedExperience).subscribe(
        (data) => {
          this.employeeList = data;
          console.log('Employees filtered by role and experience:', data);
        },
        (error) => {
          console.error('Error fetching employees by role and experience:', error);
        }
      );
    } else if (this.selectedExperience) {
      // Fetch employees filtered by role, status, and experience
      this.clientService.getEmployeesByRoleStatusAndExperience(this.selectedRole, this.selectedStatus, this.selectedExperience).subscribe(
        (data) => {
          this.employeeList = data;
          console.log('Employees filtered by role, status, and experience:', data);
        },
        (error) => {
          console.error('Error fetching employees by role, status, and experience:', error);
        }
      );
    } else if (this.selectedStatus === 'All') {
      // Fetch all employees for the selected role without considering experience
      this.clientService.getEmployeesByRole(this.selectedRole).subscribe(
        (data) => {
          this.employeeList = data;
          console.log('All employees by role:', data);
        },
        (error) => {
          console.error('Error fetching all employees by role:', error);
        }
      );
    } else {
      // Fetch employees filtered by role and status without experience
      this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus).subscribe(
        (data) => {
          this.employeeList = data;
          console.log('Employees filtered by role and status:', data);
        },
        (error) => {
          console.error('Error fetching employees by role and status:', error);
        }
      );
    }
  }
  




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

//-------------original------------

// onSubmit() {
//   // Check if client, employees, and status are selected
//   if (this.selectedClient && this.selectedEmployees.length > 0 && this.selectedStatus) {
//     // Iterate over selected employee IDs
//     this.selectedEmployees.forEach(employeeId => {
//       // Find the employee name based on employeeId from the employeeList
//       const employee = this.employeeList.find(emp => emp.employeeId === employeeId);
//       const employeeName = employee ? employee.firstName + " " + employee.lastName : '';

//       // Create the deployment status object with selected employees
//       const deploymentStatus: DeploymentStatus = {
//         clientId: Number(this.selectedClient),
//         clientName: '',
//         employeeId: employeeId,  // Assign the employee ID
//         status: this.selectedStatus,  // Set the selected status
//         role: this.selectedRole,  // Set the role
//         additionalInfo: this.additionalInfo || '',  // Set additional info
//         employeeName: employeeName,  // Set employee name
//       };

//       console.log("Sending deployment status for employee:", deploymentStatus);

//       // Call the service to save deployment status for each selected employee
//       this.clientService.addDeploymentStatus(deploymentStatus).subscribe(
//         (response) => {
//           console.log('Deployment status saved successfully for employee:', response);
          
//           // After saving deployment status, proceed with the next task (like adding employee to client)
//           this.addEmployeeToClient(employeeId);
//         },
//         (error) => {
//           console.error('Error saving deployment status for employee:', error);
//           this.showErrorMessage('There was an error saving the deployment status for this employee.');
//         }
//       );
//     });
//   } else {
//     this.showErrorMessage('Please select both a client, employee(s), and status.');
//   }
// }


onSubmit() {
  // Check if client, employees, and status are selected
  if (this.selectedClient && this.selectedEmployees.length > 0 && this.selectedStatus && this.emailSubject) {
    // Create the deployment status object for each selected employee
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
        // additionalInfo: this.additionalInfo || '',  // Set additional info
        employeeName: employeeName,  // Set employee name
      };

      console.log("Sending deployment status for employee:", deploymentStatus);

      // Call the service to save deployment status for each selected employee
      this.clientService.addDeploymentStatus(deploymentStatus).subscribe(
        (response) => {
          console.log('Deployment status saved successfully for employee:', response);
          
          // After saving deployment status, proceed with the next task (like adding employee to client)
          // this.addEmployeeToClient(employeeId);

          // Now send the email after saving deployment status
          this.sendEmail(this.emailSubject, this.additionalInfo, this.selectedEmployees, this.client);
          console.log(this.emailSubject,this.additionalInfo, this.selectedEmployees);
         
        },
        (error) => {
          console.error('Error saving deployment status for employee:', error);
          this.showErrorMessage('There was an error saving the deployment status for this employee.');
        }
      );
    });
  } else {
    this.showErrorMessage('Please select both a client, employee(s), status, and provide an email subject.');
  }
}




//-----working


// sendEmail(subject: string, body: string, employeeIds: string[], client: BdmClient) {
//   const emailData = {
//     subject: subject,
//     body: body,
//     employeeIds: employeeIds,
//     client: client  // Ensure this is an object matching BdmClient structure
//   };

//   this.clientService.sendEmail(emailData).subscribe(
//     (response) => {
//       console.log('Email sent successfully:', response);
//       alert('Email sent successfully!');
//     },
//     (error) => {
//       console.error('Error sending email:', error);
//       alert('Failed to send email.');
//       if (error && error.error) {
//         console.error('Error message from backend:', error.error);
//       }
//     }
//   );
// }

sendEmail(subject: string, body: string, employeeIds: string[], client: BdmClient) {
  const emailData = {
    subject: subject,
    body: body,
    employeeIds: employeeIds,
    client: client
  };

  this.clientService.sendEmail(emailData).subscribe(
    (response: any) => {
      // Check if the response is a JSON object and contains a message
      if (response && response.message) {
        if (response.message === 'Email sent successfully') {
          alert('Email sent successfully!');
        } else {
          alert(`Failed to send email: ${response.message}`);
        }
      } else {
        alert('Unexpected response format');
      }
    },
    (error) => {
      console.error('Error sending email:', error);

      if (error?.error?.message) {
        alert(`Failed to send email: ${error.error.message}`);
      } else {
        alert('Failed to send email. Please check your network and try again.');
      }
    }
  );
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


  // // --original---
  // onEmployeeSelected() {
  //   const selectedEmp = this.employeeList.find(emp => emp.employeeId === this.selectedEmployee);
  //   if (selectedEmp) {
  //     this.selectedEmployeeName = selectedEmp.firstName; // Set employeeName based on selected employee
  //   }
  // }


onEmployeeSelected() {
  // Prepare the list of selected employees (assuming employeeList is already populated)
  const selectedEmployeeDetails = this.employeeList.filter(employee =>
    this.selectedEmployees.includes(employee.employeeId)
  );

  // Create a string to represent the selected employee details
  let employeeDetailsString = '';
  selectedEmployeeDetails.forEach(employee => {
    employeeDetailsString += `${employee.employeeId} - ${employee.firstName} ${employee.lastName}\n`;
  });

  // Now send this string in the email body
  const emailData = {
    subject: 'Email Subject',
    body: `Selected Employees:\n\n${employeeDetailsString}`, // Include the selected employee details
    employeeIds: this.selectedEmployees,
    client: this.client // Assuming you have a client object
  };

  // Call the service to send the email
  this.clientService.sendEmail(emailData).subscribe(response => {
    console.log('Email sent response:', response);
  }, error => {
    console.error('Error sending email:', error);
  });
}



selectedEmployeeDetails: string = ''; // Stores the employee details for the email body

toggleEmployeeSelection(employee: any) {
  // Check if the employee is already selected
  const index = this.selectedEmployees.indexOf(employee.employeeId);

  if (index > -1) {
    // If selected, remove from the list
    this.selectedEmployees.splice(index, 1);
  } else {
    // If not selected, add to the list
    this.selectedEmployees.push(employee.employeeId);
  }

  // Update the selectedEmployeeDetails string
  this.updateEmployeeDetailsString();
}

// Function to prepare the string for selected employees
updateEmployeeDetailsString() {
  // Filter selected employees
  const selectedEmployeeObjects = this.employeeList.filter(employee =>
    this.selectedEmployees.includes(employee.employeeId)
  );

  // Create a formatted string for selected employee details
  this.selectedEmployeeDetails = selectedEmployeeObjects
    .map(employee => `${employee.employeeId} - ${employee.firstName} ${employee.lastName}`)
    .join('\n');
}




}
