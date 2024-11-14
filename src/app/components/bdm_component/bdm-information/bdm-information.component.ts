import { ChangeDetectorRef, Component } from '@angular/core';
import { BdmService } from '../bdm.service';
import * as bootstrap from 'bootstrap';
import { DeployedCandidates } from 'src/app/Models/DeployedCandidates';

@Component({
  selector: 'app-bdm-information',
  templateUrl: './bdm-information.component.html',
  styleUrls: ['./bdm-information.component.scss']
})
export class BdmInformationComponent {

  candidates: any[] = [];
  noDataMessage: string = '';
  selectedRole: string = 'Tester'; 
  // selectedCandidate: DeployedCandidates ; 
  selectedCandidate: DeployedCandidates | null = null;

  // deployedCandidates: any[] = []; 

  constructor(private bdmService: BdmService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCandidates(this.selectedRole);

  }


  // fetchCandidates(role: string): void {

  //   console.log("Fetching deployed candidates for role:", role);
    
  //   this.selectedRole = role; // Set the selected role to be used for dynamic UI changes
  //   this.noDataMessage = ''; // Reset the no data message
    
  //   this.bdmService.getDeployedCandidatesByRole(role).subscribe(
  //     (data: DeployedCandidates[]) => {
  //       console.log('Data received for role:', role, data); // Log the data to debug
  //       if (data && data.length > 0) {
  //         this.candidates = data; // Update the candidates list if data is found
  //       } else {
  //         this.candidates = []; // Reset the candidates list if no data found
  //         this.noDataMessage = `No deployed candidates found for ${this.selectedRole}.`; // Display the no data message
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching deployed candidates:', error); // Log the error for debugging
  //       this.noDataMessage = 'An error occurred while fetching data: ' + error.message; // Show an error message if the request fails
  //     }
  //   );
  // }
  

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
            // // Fetch dateOfJoin here for each candidate
            // this.bdmService.getEmployeeById(candidate.employeeId).subscribe(
            //   (employee) => {
            //     // Check if employee object exists and contains dateOfJoin
            //     if (employee && employee.dateOfJoin) {
            //       candidate.dateOfJoin = employee.dateOfJoin; // Add the dateOfJoin to the candidate object
            //       this.cdr.detectChanges(); // Manually trigger change detection
            //     } else {
            //       console.error('Employee or dateOfJoin not found for employeeId:', candidate.employeeId);
            //     }
            //   },
            //   (error) => {
            //     console.error('Error fetching employee details:', error);
            //   }
            // );
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
  

  

 
  // editCandidate(candidate: any): void {
  //   // Implement the logic to edit the candidate details
  //   console.log('Edit candidate:', candidate);
  // }


  



  editCandidate(candidate: DeployedCandidates): void {
    // Ensure selectedCandidate is assigned before the modal opens
    this.selectedCandidate = { ...candidate };

    // Show the modal after setting selectedCandidate
    const modalElement = document.getElementById('editDateModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // submitEdit(): void {
  //   if (this.selectedCandidate) {
  //     this.bdmService.updateDeployedCandidateDateOfJoin(this.selectedCandidate).subscribe(
  //       (response) => {
  //         console.log('Candidate updated successfully:', response);
  //         const modalElement = document.getElementById('editDateModal') as HTMLElement;
  //         const modal = bootstrap.Modal.getInstance(modalElement);
  //         modal?.hide();
  //         const index = this.candidates.findIndex(c => c.deployedId === this.selectedCandidate!.deployedId);
  //         if (index !== -1) {
  //           this.candidates[index] = { ...this.selectedCandidate };
  //         }
  //       },
  //       (error) => {
  //         console.error('Error updating candidate:', error);
  //         alert('An error occurred while updating the candidate.');
  //       }
  //     );
  //   }
  // }
  
  
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
    // Confirm the deletion action
    if (confirm('Are you sure you want to delete this deployed candidate?')) {
      // Call the delete API via the service
      this.bdmService.deleteDeployedCandidate(candidate.deployedId).subscribe(
        (response) => {
       
          // Update the candidates list after successful deletion
          // Remove the deleted candidate from the list
          this.candidates = this.candidates.filter(item => item.deployedId !== candidate.deployedId);
  
        },
        (error) => {
          // Log and handle errors appropriately
          console.error('Error deleting deployed candidate:', error);
          alert('An error occurred while deleting the candidate.');
        }
      );
    }
  }
  



}
