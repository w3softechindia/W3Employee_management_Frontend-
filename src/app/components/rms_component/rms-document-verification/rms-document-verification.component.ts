import { Component } from '@angular/core';

@Component({
  selector: 'app-rms-document-verification',
  templateUrl: './rms-document-verification.component.html',
  styleUrls: ['./rms-document-verification.component.scss']
})
export class RmsDocumentVerificationComponent {
viewDocument() {
throw new Error('Method not implemented.');
}

  employees = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      documents: {
        PAN: 'Verified',
        Aadhar: 'Verified',
        certificates: 'Pending'
      }
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      documents: {
        PAN: 'Pending',
        Aadhar: 'Verified',
        certificates: 'Verified'
      }
    }
  ];

  showDocumentVerificationPopup = false;
  showOfferLetterPopup = false;
  selectedEmployee: any = null;

  documents = [
    { name: 'PAN Card', isVerified: false },
    { name: 'Aadhar Card', isVerified: false },
    { name: 'Certificates', isVerified: false }
  ];

  // Open document verification popup
  openDocumentVerificationPopup(employee: any) {
    this.selectedEmployee = employee;

    // Set the documents verification status based on the employee's documents
    this.documents = [
      { name: 'PAN Card', isVerified: employee.documents.PAN === 'Verified' },
      { name: 'Aadhar Card', isVerified: employee.documents.Aadhar === 'Verified' },
      { name: 'Certificates', isVerified: employee.documents.certificates === 'Verified' }
    ];

    this.showDocumentVerificationPopup = true;
  }

  // Close document verification popup
  closeDocumentVerificationPopup() {
    this.showDocumentVerificationPopup = false;
  }

  // Reconfirm a particular document
  reconfirmDocument(doc: any) {
    alert(`reconfirm mail sent for ${doc.name}`);
  }

  // Check if all documents are verified
  allDocumentsVerified() {
    return this.documents.every(doc => doc.isVerified);
  }

  // Proceed to generate the offer letter
  proceedToGenerateOfferLetter() {
    this.closeDocumentVerificationPopup();
    this.showOfferLetterPopup = true;
  }

  // Close offer letter popup
  closeOfferLetterPopup() {
    this.showOfferLetterPopup = false;
  }



  // Generate the offer letter
  generateOfferLetter() {
    console.log('Offer Letter generated for', this.selectedEmployee.name);
    alert("Offer Letter Sent to Employee");
    this.closeOfferLetterPopup();
  }
}
