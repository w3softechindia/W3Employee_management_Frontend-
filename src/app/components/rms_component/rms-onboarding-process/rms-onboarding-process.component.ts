import { Component } from '@angular/core';

@Component({
  selector: 'app-rms-onboarding-process',
  templateUrl: './rms-onboarding-process.component.html',
  styleUrls: ['./rms-onboarding-process.component.scss']
})
export class RmsOnboardingProcessComponent {
  employees = [
    { name: 'John Doe', email: 'john@example.com', status: 'Shortlisted', interviewDate: new Date() },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Shortlisted', interviewDate: new Date() }
  ];

  showPopup: boolean = false;
  showDocumentPopup = false;
  selectedEmployee: any = null;
  openEditPopup(employee: any) {
    this.selectedEmployee = employee;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedEmployee = null;
  }

  documents = {
    panCard: false,
    aadharCard: false,
    educationCertificates: false,
  };

  approveAction() {
  alert("Confirmation mail sent");    
  }

  rejectAction() {
    alert("Offer Letter mail sent");    
  }

  closeDocumentPopup() {
    this.showDocumentPopup = false;
  }

  selectAllDocuments() {
    this.documents.panCard = true;
    this.documents.aadharCard = true;
    this.documents.educationCertificates = true;
  }

  submitDocuments() {
    // Handle document submission logic
    console.log('Selected documents:', this.documents);
    this.closeDocumentPopup();
  }
}