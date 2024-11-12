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

  // Open modal to edit interview details
onDelete(_t19: { name: string; id: string; clientName: string; clientLocation: string; numberOfRounds: number; numberOfRoundsHeld: number; status: string; dateOfInterview: string; }) {
throw new Error('Method not implemented.');
}
filterByRole(arg0: string) {
throw new Error('Method not implemented.');
}
  showModal = false;
  selectedInterview: any = null;

  // Sample data for interviews
  interviews = [
    { name: 'John Doe', id: 'E12345', clientName: 'ABC Corp', clientLocation: 'New York', numberOfRounds: 3, numberOfRoundsHeld: 2, status: 'In Progress', dateOfInterview: '2024-10-10' },
    { name: 'Jane Smith', id: 'E12346', clientName: 'XYZ Ltd.', clientLocation: 'London', numberOfRounds: 2, numberOfRoundsHeld: 2, status: 'Completed', dateOfInterview: '2024-10-12' },
    
  ];


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
