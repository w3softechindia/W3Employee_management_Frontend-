import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { RejectedCandidates } from 'src/app/Models/RejectedCandidates';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bdm-rejectedcandiates',
  templateUrl: './bdm-rejectedcandiates.component.html',
  styleUrls: ['./bdm-rejectedcandiates.component.scss']
})
export class BdmRejectedcandiatesComponent implements OnInit {

  rejectedCandidates: RejectedCandidates[] = [];
  selectedRole: string = 'Tester'; // Set default role to 'Tester'
  noDataMessage: string = '';


  constructor(private bdmService: BdmService) { }

  ngOnInit(): void {

    // Automatically fetch rejected candidates when the component is initialized
    this.fetchCandidates(this.selectedRole);
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
    });
  }
  

}
