import { Component } from '@angular/core';

@Component({
  selector: 'app-bdm-deploymentstatus',
  templateUrl: './bdm-deploymentstatus.component.html',
  styleUrls: ['./bdm-deploymentstatus.component.scss']
})
export class BdmDeploymentstatusComponent {
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
    // Logic to save changes
    this.showModal = false;
  }
}