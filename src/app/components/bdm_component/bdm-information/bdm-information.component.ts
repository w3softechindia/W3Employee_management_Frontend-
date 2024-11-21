import { ChangeDetectorRef, Component } from '@angular/core';
import { BdmService } from '../bdm.service';
import * as bootstrap from 'bootstrap';
import { DeployedCandidates } from 'src/app/Models/DeployedCandidates';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bdm-information',
  templateUrl: './bdm-information.component.html',
  styleUrls: ['./bdm-information.component.scss']
})
export class BdmInformationComponent {

  candidates: any[] = [];
  noDataMessage: string = '';
  selectedRole: string = 'Tester'; 
  selectedCandidate: DeployedCandidates | null = null;
  selectedEmployee: any = {}; // To store the employee details for the modal
  errorMessage: string | null = null;


  constructor(private bdmService: BdmService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCandidates(this.selectedRole);

  }

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

  fetchCandidates(role: string): void {
    console.log("Fetching deployed candidates for role:", role);
  
    this.selectedRole = role; // Set the selected role to be used for dynamic UI changes
    this.noDataMessage = ''; // Reset the no data message
  
    this.bdmService.getDeployedCandidatesByRole(role).subscribe(
      (data: DeployedCandidates[]) => {
        console.log('Data received for role:', role, data); // Log the data to debug
        if (data && data.length > 0) {
          // Enhance the candidates with dateOfJoin
          this.candidates = data.map(candidate => {
            return candidate;
          });
        } else {
          this.candidates = []; // Reset the candidates list if no data found
          this.noDataMessage = `No deployed candidates found for ${this.selectedRole}.`; // Display the no data message
        }
      },
      (error) => {
        console.error('Error fetching deployed candidates:', error); // Log the error for debugging
        this.noDataMessage = 'An error occurred while fetching data: ' + error.message; // Show an error message if the request fails
      }
    );
  }
  



  editCandidate(candidate: DeployedCandidates): void {
    // Ensure selectedCandidate is assigned before the modal opens
    this.selectedCandidate = { ...candidate };

    // Show the modal after setting selectedCandidate
    const modalElement = document.getElementById('editDateModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  
  submitEdit(): void {
    if (this.selectedCandidate) {
      this.bdmService.updateDeployedCandidateDateOfJoin(this.selectedCandidate).subscribe(
        (response) => {
          console.log('Candidate updated successfully:', response);
          
          // Hide the modal
          const modalElement = document.getElementById('editDateModal') as HTMLElement;
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
  
          // Find the candidate in the array and update it with a new object reference
          const index = this.candidates.findIndex(c => c.deployedId === this.selectedCandidate!.deployedId);
          if (index !== -1) {
            this.candidates[index] = { ...this.selectedCandidate };  // Create a new object to trigger change detection
          }
  
          // Manually trigger change detection if needed
          // This might be necessary if Angular isn't detecting changes automatically
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error updating candidate:', error);
          alert('An error occurred while updating the candidate.');
        }
      );
    }
  }
  
  

  deleteCandidate(candidate: any): void {
    // Show a confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this deployed candidate?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API via the service
        this.bdmService.deleteDeployedCandidate(candidate.deployedId).subscribe(
          (response) => {
            // Update the candidates list after successful deletion
            this.candidates = this.candidates.filter(item => item.deployedId !== candidate.deployedId);
            
            // Show a success message using SweetAlert2
            Swal.fire(
              'Deleted!',
              'The deployed candidate has been successfully deleted.',
              'success'
            );
          },
          (error) => {
            // Log and handle errors appropriately
            console.error('Error deleting deployed candidate:', error);
            
            // Show an error message using SweetAlert2
            Swal.fire(
              'Error!',
              'An error occurred while deleting the candidate. Please try again.',
              'error'
            );
          }
        );
      }
    });
  }
  


}
