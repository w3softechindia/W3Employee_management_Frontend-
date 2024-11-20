import { Component } from '@angular/core';

@Component({
  selector: 'app-relieving-form',
  templateUrl: './increment-emp.component.html',
  styleUrls: ['./increment-emp.component.scss']
})
export class IncrementEmpComponent {
  formData = {
    salutation: '',
    name: '',
    employeeId: '',
    designation: '',
    resignDate: '',
    dateOfJoin: '',
    dateOfResign: '',
    reason: '',
    supervisor: '',
    email: ''
  };

  interviewDetails = [
    { employeeId: '001', name: 'John Doe', dateOfJoin: '2022-01-10', resignDate: '2023-01-10', designation: 'Developer', reason: 'Personal', supervisor: 'Jane Smith' },
    // Add more interview details as needed
  ];

  isLoading = false;
  showError = false;
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
        resignDate: '',
        dateOfJoin: '',
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

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }
}