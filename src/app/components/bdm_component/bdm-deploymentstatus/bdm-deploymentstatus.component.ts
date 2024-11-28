import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BdmService } from '../bdm.service';
import { DeploymentStatus } from 'src/app/Models/deployment-status';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-bdm-deploymentstatus',
  templateUrl: './bdm-deploymentstatus.component.html',
  styleUrls: ['./bdm-deploymentstatus.component.scss']
})
export class BdmDeploymentstatusComponent implements OnInit {



  interviews: any;
  showModal = false;
  selectedInterview: any = null;
  selectedRole: string = '';
  selectedEmployee: any = {}; // To store the employee details for the modal
  errorMessage: string | null = null;
  
  constructor(private bdmService: BdmService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Optionally load default data here
    this.filterByRole('Tester'); // Load data for Testers by default
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
  
  

  filterByRole(role: string): void {
    this.selectedRole = role;



    const fetchDeploymentStatus = role === 'Tester'
      ? this.bdmService.getTestersDeploymentStatus()
      : this.bdmService.getDevelopersDeploymentStatus();

    fetchDeploymentStatus.subscribe(
      (data) => {
        // Update interviews list with data from the API
        this.interviews = data;

        // Loop through each interview and fetch client details by clientId
        this.interviews.forEach((interview: DeploymentStatus, index: number) => {
          if (interview.clientId) {
            this.bdmService.getClientDetails(interview.clientId.toString()).subscribe(
              (clientData) => {
                if (clientData) {
                  // Use type assertion to add clientName and clientLocation dynamically
                  (this.interviews[index] as any).clientName = clientData.companyName;
                  (this.interviews[index] as any).clientLocation = clientData.location;
                }
              },
              (error) => {
                console.error('Error fetching client details:', error);
              }
            );
          }
        });

      },
      (error) => {
        console.error(`Error fetching ${role} data:`, error);
      }
    );
  }

  onEditDetails(interview: any) {
    this.selectedInterview = { ...interview };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }




  onSubmitDeployDetails(): void {
    const deploymentId = this.selectedInterview.deploymentId;

    this.bdmService.editDeploymentStatus(deploymentId, this.selectedInterview).subscribe(
      (response) => {
        console.log('Data saved successfully:', response);

        const interviewStatus = this.selectedInterview.interviewStatus;

        // Find the interview in the 'interviews' array using the deploymentId
        const updatedInterviewIndex = this.interviews.findIndex((interview: { deploymentId: any; }) => interview.deploymentId === deploymentId);

        if (updatedInterviewIndex !== -1) {
          // Update the interview with the new data
          this.interviews[updatedInterviewIndex] = response;
        }

        // Check if the interview status is 'Deployed'
        if (interviewStatus === 'Deployed') {
          // Save data in the deployed candidates table
          this.saveToDeployedCandidate();
        } else if (interviewStatus === 'Rejected') {
          // Save data in the rejected candidates table
          this.saveToRejectedCandidates();
        } else {
          // Optionally, handle other statuses if necessary
          console.log("Interview status is neither 'Deployed' nor 'Rejected'. No action taken.");
        }

        // Optionally close the modal after saving data
        this.showModal = false;

        // Manually trigger change detection to ensure UI updates
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }


  saveToRejectedCandidates(): void {
    // Call the service method to save data in the rejected candidates table
    this.bdmService.saveRejectedCandidate(this.selectedInterview).subscribe(
      (response) => {
        console.log('Data saved in rejected candidates:', response);

        // Optionally close the modal after saving data
        this.showModal = false;

        // Trigger change detection to ensure UI updates
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error saving rejected candidate:', error);
      }
    );
  }


  saveToDeployedCandidate(): void {
    // Call the service method to save data in the deployed candidates table
    this.bdmService.saveDeployedCandidate(this.selectedInterview).subscribe(
      (response) => {
        console.log('Data saved in deployed candidates:', response);

        // Optionally close the modal after saving data
        this.showModal = false;

        // Trigger change detection to ensure UI updates
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error saving deployed candidate:', error);
      }
    );
  }




  onDeleteDeployDetails(deploymentId: number): void {
    // Show a confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this interview?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API via the service
        this.bdmService.deleteDeploymentStatus(deploymentId).subscribe(
          () => {
            // On successful delete, remove the interview from the list
            this.interviews = this.interviews.filter(
              (interview: { deploymentId: number; }) => interview.deploymentId !== deploymentId
            );
  
            // Show a success message using SweetAlert2
            Swal.fire(
              'Deleted!',
              'The interview has been successfully deleted.',
              'success'
            );
          },
          (error) => {
            // Log and handle errors appropriately
            console.error('Error deleting interview:', error);
            
            // Show an error message using SweetAlert2
            Swal.fire(
              'Error!',
              'An error occurred while deleting the interview. Please try again.',
              'error'
            );
          }
        );
      }
    });
  }
  



}