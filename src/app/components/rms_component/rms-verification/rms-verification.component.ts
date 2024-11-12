import { Component, OnInit } from '@angular/core';
import { RmsServiceService } from '../../rms_component/rms-service.service';
import { Applicant } from 'src/app/Models/applicant';

@Component({
  selector: 'app-rms-verification',
  templateUrl: './rms-verification.component.html',
  styleUrls: ['./rms-verification.component.scss']
})
export class RmsVerificationComponent implements OnInit {
  applicants: Applicant[] = []; // To hold the list of applicants
  showDocumentVerificationPopup = false;
  selectedApplicant: any = null;
  documentChecklist: { name: string; isVerified: boolean; }[] = [];
  uncheckedList: string;

  constructor(private rmsService: RmsServiceService) {}

  ngOnInit(): void {
    this.fetchApplicants();
  }

  // Fetch all applicants
  fetchApplicants(): void {
    this.rmsService.getApplicants().subscribe(
      (data: Applicant[]) => {
        this.applicants = data;
      },
      (error) => {
        console.error('Error fetching applicants:', error);
      }
    );
  }

  // Open the document in a new tab
  viewDocument(documentUrl: string): void {
    const byteCharacters = atob(documentUrl);
    const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  // Method to open the document verification popup
  openDocumentVerificationPopup(applicant: Applicant): void {
    this.selectedApplicant = applicant;
    this.showDocumentVerificationPopup = true;

    // Initialize document checklist with only PAN, Aadhar, and Degree Certificate
    this.documentChecklist = [
      { name: 'PAN Card', isVerified: false },
      { name: 'Aadhar Card', isVerified: false },
      { name: 'Degree Certificate', isVerified: false }
    ];
  }

  // Method to close the document verification popup
  closeDocumentVerificationPopup(): void {
    this.showDocumentVerificationPopup = false;
    this.selectedApplicant = null;
  }

  // Check if all documents are verified
  allDocumentsVerified(): boolean {
    return this.documentChecklist.every(doc => doc.isVerified);
  }

  // Check if any documents are unverified
  anyDocumentsUnverified(): boolean {
    return this.documentChecklist.some(doc => !doc.isVerified);
  }

  // Method to handle document reconfirmation for unchecked items
  reconfirmDocument(): void {
    const uncheckedDocuments = this.documentChecklist
      .filter(doc => !doc.isVerified)
      .map(doc => doc.name);

    if (uncheckedDocuments.length > 0) {
      let uncheckedList = uncheckedDocuments.join(', ');
      console.log(uncheckedDocuments);
      alert(`Reconfirmation mail sent for: ${uncheckedList}`);
    
      // Call the backend to update status and send email
      this.rmsService.updateReconfirmationStatus(this.selectedApplicant.id, 'Re-confirmation Mail Sent', uncheckedDocuments.join(', '))
        .subscribe(
          response => {
            // Set applicant's status to "Reconfirm"
            this.selectedApplicant.status = 'Re-confirmation Mail Sent';
            console.log(status);
          },
          
          error => {
            console.log(status);
            console.error('Error updating reconfirmation status:', error);
          }
        );
    } else {
      alert('All documents are verified, no need for reconfirmation.');
    }
  }
 
  generateOfferLetter() {
    // if (this.selectedApplicant.isDocumentsVerified) { // Replace with actual verification check
      this.rmsService.updateOfferLetterStatus(this.selectedApplicant.id, 'Offer Letter Generated')
        .subscribe(
          response => {
            // Set applicant's status to "Offer Letter Generated"
            this.selectedApplicant.status = 'Offer Letter Generated';
            alert('Offer letter generated successfully!');
          },
          error => {
            console.error('Error updating offer letter status:', error);
          }
        );
    
  }
  
  
}
