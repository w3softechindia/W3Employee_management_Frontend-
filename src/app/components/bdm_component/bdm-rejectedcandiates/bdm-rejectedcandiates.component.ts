
import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { RejectedCandidates } from 'src/app/Models/RejectedCandidates';


@Component({
  selector: 'app-bdm-rejectedcandiates',
  templateUrl: './bdm-rejectedcandiates.component.html',
  styleUrls: ['./bdm-rejectedcandiates.component.scss'],
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
    if (confirm('Are you sure you want to delete this candidate?')) {
      this.bdmService.deleteRejectedCandidate(rejectionId).subscribe(
        () => {
          // On successful delete, remove the candidate from the list
          this.rejectedCandidates = this.rejectedCandidates.filter(
            (candidate) => candidate.rejectionId !== rejectionId
          );
          this.noDataMessage = this.rejectedCandidates.length === 0
            ? `No rejected candidates found for ${this.selectedRole}.`
            : '';
        },
        (error) => {
          console.error('Error deleting candidate:', error);
          this.noDataMessage = 'An error occurred while deleting the candidate.';
        }
      );
    }

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
              (item) => item.id !== this.selectedItemToDelete.id
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
