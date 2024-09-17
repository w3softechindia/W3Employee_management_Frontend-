import { Component } from '@angular/core';

@Component({
  selector: 'app-bdm-details',
  templateUrl: './bdm-details.component.html',
  styleUrls: ['./bdm-details.component.scss']
})
export class BdmDetailsComponent {
  // Array to store additional details
  additionalDetails: string[] = [];

  // Add a new empty detail box
  addAdditionalDetails() {
    this.additionalDetails.push('');
  }

  // Remove a detail box at a specific index
  removeDetail(index: number) {
    this.additionalDetails.splice(index, 1);
  }
}
