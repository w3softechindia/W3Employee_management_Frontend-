import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  interviewDetails = [
    {
      employeeId: 1,
      employeeEmail: 'john.doe@example.com',
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
      employeeName: 'John Doe',
      dateOfJoin: '2020-05-10',
      designation: 'Software Engineer',
      bank: 'Bank A',
      ifscCode: 'IFSC001',
      accountNo: '1234567890',
      pan: 'ABCDE1234F',
      uan: 'UAN001',
      pfid: 'PF001',
      package: '5 LPA',
      basicPA: '2 LPA',
      hraPA: '1 LPA',
      conAllowPA: '0.5 LPA',
      medAllowPA: '0.3 LPA',
      othAllowPA: '0.2 LPA',
      grossPM: '40,000',
      pt: '200',
      pf: '1500',
      ded: '500',
      lop: '0',
      tds: '1000',
      adjust: '100',
      deduc: '0',
      totalDeduc: '3300',
      netSal: '36600'
    },
    {
      employeeId: 2,
      employeeEmail: 'jane.smith@example.com',
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
      employeeName: 'Jane Smith',
      dateOfJoin: '2021-02-15',
      designation: 'QA Analyst',
      bank: 'Bank B',
      ifscCode: 'IFSC002',
      accountNo: '0987654321',
      pan: 'ABCDE5678G',
      uan: 'UAN002',
      pfid: 'PF002',
      package: '4.5 LPA',
      basicPA: '1.8 LPA',
      hraPA: '0.9 LPA',
      conAllowPA: '0.4 LPA',
      medAllowPA: '0.2 LPA',
      othAllowPA: '0.2 LPA',
      grossPM: '37,500',
      pt: '200',
      pf: '1200',
      ded: '400',
      lop: '1',
      tds: '900',
      adjust: '50',
      deduc: '100',
      totalDeduc: '2850',
      netSal: '34650'
    }
  ];

//     isLoading = false;
//     showError = false;
//     showPopup = false;
//     showFullDetails = false;
//     showConfirmation = false;
//     selectedAction = '';
//     comment = '';

//     constructor() {}

//     ngOnInit(): void {}

//     openUpdateStatusPopup(employeeId: string) {
//       this.showPopup = true;
//     }

//     confirmUpdate(action: string) {
//       this.selectedAction = action;
//       this.showPopup = false;
//       this.showConfirmation = true;
//     }

//     updateStatus() {
//       // Here, handle the update status action
//       console.log(`Updating status with action: ${this.selectedAction}`);
//       this.closeConfirmation();
//     }

//     closeConfirmation() {
//       this.showConfirmation = false;
//       this.selectedAction = '';
//       this.comment = '';
//     }

//     toggleColumnVisibility() {
//       this.showFullDetails = !this.showFullDetails;
//     }
//   }

isLoading = true;
showError = false;
// interviewDetails = []; // Assume this gets populated with interview data
showFullDetails = true; // You can toggle to show more or less details
showModal = false; // Modal visibility flag
selectedDetail: any = null; // Holds the selected employee details for the modal
selectedDetail1: any = null;
showModal1=false;
ngOnInit(): void {
  // Load interview details here
  // For example, this could be a service call that retrieves data from an API
}

// Function to open the modal with the selected interview details
openUpdateStatusPopup(detail: any): void {
  this.selectedDetail = detail;
  this.showModal1 = true;
}
viewDetails(detail: any): void {
  this.selectedDetail = detail;
  this.showModal = true;
}


// Close the modal
closeModal(): void {
  this.showModal = false;
  this.selectedDetail = null;
}
closeModal1(): void {
  this.showModal1 = false;
  this.selectedDetail = null;
}

// Function for updating the interview status (you can define its functionality based on your requirements)
formData = {
  salutation: '',
  name: '',
  employeeId: '',
  designation: '',
  joiningDate: '',
  dateOfJoin: '',
  payslipFromDate:'',
  payslipTillDate:'',
  dateOfResign: '',
  reason: '',
  supervisor: '',
  email: ''
};


showPopup = false;
showSuccessPopup = false;

openRelievingForm(detail?: any) {
  if (detail) {
    this.formData = { ...detail }; // Populate formData with the selected detail if it's passed
  } else {
    // If no detail is passed, you may want to set a default state for the form
    this.formData = {
      salutation: '',
      name: '',
      employeeId: '',
      designation: '',
      payslipTillDate:'',
      joiningDate: '',
      dateOfJoin: '',
      payslipFromDate:'',
      dateOfResign: '',
      reason: '',
      supervisor: '',
      email: ''
    };
  }
  this.showPopup = true;
}

toggleFormDisplay() {
  this.showPopup = !this.showPopup;
}

submitRelievingForm() {
  // Logic for submitting the relieving form goes here
  this.showPopup = false;
  this.showSuccessPopup = true;
}

closeRelievingForm() {
  this.showPopup = false;
}
leaveApprove(): void {
  alert("Leave Approved Successfully");
}

}
