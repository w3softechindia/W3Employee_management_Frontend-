
import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { RejectedCandidates } from 'src/app/Models/RejectedCandidates';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-bdm-rejectedcandiates',
  templateUrl: './bdm-rejectedcandiates.component.html',
  styleUrls: ['./bdm-rejectedcandiates.component.scss'],
})
export class BdmRejectedcandiatesComponent implements OnInit {
  [x: string]: any;
 rejectedCandidates: RejectedCandidates[] = [];
  selectedRole: string = 'Tester'; // Set default role to 'Tester'
  noDataMessage: string = '';
  selectedEmployee: any = {}; // To store the employee details for the modal
  errorMessage: string | null = null;


  constructor(private bdmService: BdmService) { }

  ngOnInit(): void {

    // Automatically fetch rejected candidates when the component is initialized
    this.fetchCandidates(this.selectedRole);
  }

  
  // viewEmployeeDetails(employeeId: string) {
  //   this.bdmService.getEmployeeById(employeeId).subscribe({
  //     next: (employee) => {
  //       this.selectedEmployee = employee;
  //       this.errorMessage = null;
  //       const modal = new bootstrap.Modal(document.getElementById('employeeModal') as HTMLElement);
  //       modal.show();
  //     },
  //     error: () => {
  //       this.errorMessage = 'Employee not found!';
  //     }
  //   });
  // }

  viewEmployeeDetails(employeeId: string): void {
    this.bdmService.getEmployeeById(employeeId).subscribe({
      next: (employee) => {
        this.selectedEmployee = employee;
        this.errorMessage = null;
  
        Swal.fire({
          title: 'Employee Details', // Title text (without any extra styling)
          html: `
            <div style="text-align: center; margin-top: 10px;">
              <p><strong>Employee ID:</strong> ${employee.employeeId}</p>
              <p><strong>Full Name:</strong> ${employee.firstName} ${employee.lastName}</p>
              <p><strong>Address:</strong> ${employee.address}</p>
              <p><strong>Email:</strong> ${employee.employeeEmail}</p>
              <p><strong>Phone Number:</strong> ${employee.phoneNumber}</p>
              <p><strong>Employee Role:</strong> 
                ${
                  employee.roles
                    ?.map((role: { roleName: string }) => role.roleName)
                    .join(', ') || 'N/A'
                }
              </p>
              <p><strong>Employee Status:</strong> ${employee.status}</p>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: 'Close',
          showCloseButton: false, // Remove the X button
          icon: undefined, // Removes the default icon
          customClass: {
            popup: 'custom-popup', // Custom class for the popup container
          },
          didOpen: () => {
            // Apply custom styles to the title and remove padding from the title div
            const swalTitle = document.querySelector('.swal2-title');
            if (swalTitle) {
              swalTitle.setAttribute('style', 'padding: 15px; background-color: #4caf50; color: white;  text-align: center;');
            }
            
            // Apply inline styles after the modal has opened to remove padding from the body
            const modalBody = document.querySelector('.swal2-html-container');
            if (modalBody) {
              modalBody.setAttribute('style', 'padding: 0 !important; margin: 0 !important;');
            }
          },
        });
      },
      error: () => {
        this.errorMessage = 'Employee not found!';
  
        Swal.fire({
          title: '<div style="background-color: red; color: white; padding: 15px;  text-align: center;">Error!</div>',
          text: this.errorMessage,
          showConfirmButton: true,
          confirmButtonText: 'Close',
          showCloseButton: false, // Remove the X button
          icon: undefined, // Removes the default icon
          customClass: {
            popup: 'custom-popup', // Custom class for the popup container
          },
          didOpen: () => {
            // Apply custom styles to the title and remove padding from the title div
            const swalTitle = document.querySelector('.swal2-title');
            if (swalTitle) {
              swalTitle.setAttribute('style', 'padding: 0; background-color: red; color: white;  text-align: center;');
            }
            
            // Apply inline styles after the modal has opened to remove padding from the body
            const modalBody = document.querySelector('.swal2-html-container');
            if (modalBody) {
              modalBody.setAttribute('style', 'padding: 0 !important; margin: 0 !important;');
            }
          },
        });
      }
    });
  }
  

  fetchCandidates(role: string) {
    this.selectedRole = role;
    this.noDataMessage = '';
    this.bdmService.getRejectedCandidatesByRole(role).subscribe(
      (data: RejectedCandidates[]) => {
        console.log('Data received for role:', role, data); // Log data for debugging
        if (data.length > 0) {
          this.rejectedCandidates = data;
        } else {
          this.rejectedCandidates = [];
          this.noDataMessage = `No rejected candidates found for ${this.selectedRole}.`;
        }
      },
      (error) => {
        console.error('Error fetching rejected candidates:', error);
        this.noDataMessage = 'An error occurred while fetching data: ' + error.message;
      }
    );
  }



  deleteCandidate(rejectionId: number): void {

    // Show a confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this candidate?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API via the service
        this.bdmService.deleteRejectedCandidate(rejectionId).subscribe(
          () => {
            // On successful delete, remove the rejected candidate from the list
            this.rejectedCandidates = this.rejectedCandidates.filter(
              (candidate) => candidate.rejectionId !== rejectionId
            );
  
            // Update the noDataMessage if there are no rejected candidates
            this.noDataMessage = this.rejectedCandidates.length === 0
              ? `No rejected candidates found for ${this.selectedRole}.`
              : '';
  
            // Show a success message using SweetAlert2
            Swal.fire(
              'Deleted!',
              'The candidate has been successfully deleted.',
              'success'
            );
          },
          (error) => {
            // Log and handle errors appropriately
            console.error('Error deleting candidate:', error);
            
            // Show an error message using SweetAlert2
            Swal.fire(
              'Error!',
              'An error occurred while deleting the candidate. Please try again.',
              'error'
            );
          }
        );
      }
    })
  }
  

  // Delete an employee after confirmation
  deleteItem() {
    if (this.selectedItemToDelete) {
      this.bdmService  // Use BdmService method
        .deleteEmployeeFromTeam(this.selectedItemToDelete.id)
        .subscribe(
          () => {
            // Filter out the deleted employee from the list of rejected details
            this.rejectedDetails = this.rejectedDetails.filter(
              (item: { id: any; }) => item.id !== this.selectedItemToDelete.id
            );
            this.closeDeleteModal();  // Close the delete modal
          },
          (error: any) => {
            console.error('Error deleting item:', error);
          }
        );
    }
  }
}
