import { Component } from '@angular/core';

import { BdmService } from '../bdm.service';



@Component({
  selector: 'app-bdm-deploymentstatus',
  templateUrl: './bdm-deploymentstatus.component.html',
  styleUrls: ['./bdm-deploymentstatus.component.scss']
})
export class BdmDeploymentstatusComponent {

  showModal = false;
  selectedInterview: any = null;
  interviews: any[] = []; // Array to store the fetched interviews
  filteredInterviews: any[] = []; // Array to store filtered interviews

  constructor(private bdmService: BdmService) {}

  ngOnInit(): void {
    // Fetch interviews when the component initializes
    this.fetchInterviews();
  }

  // Fetching interviews from the service
  fetchInterviews() {
    this.bdmService.getInterviews().subscribe(
      (data: any[]) => {
        this.interviews = data; // Storing the fetched interviews
        this.filteredInterviews = data; // Initialize filteredInterviews
      },
      (error: any) => {
        console.error('Error fetching interviews:', error);
      }
    );
  }

  // Method to filter interviews by role
  filterByRole(role: string) {
    this.filteredInterviews = this.interviews.filter(interview => interview.role === role);
  }


  OpenModal(interview: any) {
    this.selectedInterview = { ...interview };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSave() {

    if (this.selectedInterview) {
      const clientId = this.selectedInterview.clientId; // Assuming clientId exists in selectedInterview
      this.bdmService.updateInterview(clientId, this.selectedInterview).subscribe(
        (response: any) => {
          console.log('Interview updated successfully:', response);
          this.fetchInterviews(); // Refresh the interview list after updating
          this.showModal = false; // Close the modal after saving
        },
        (error: any) => {
          console.error('Error saving interview:', error);
        }
      );
    }
  }

  onDelete(interview: any) {
    if (interview && interview.clientId) {
      const clientId = interview.clientId;
      this.bdmService.deleteInterview(clientId, interview).subscribe(
        () => {
          console.log('Interview deleted successfully');
          this.fetchInterviews(); // Refresh the interview list
        },
        (error: any) => {
          console.error('Error deleting interview:', error);
        }
      );
    }
  }
}
