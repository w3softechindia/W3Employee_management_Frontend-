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
  showPopup = false;

  submitRelievingForm() {
    // Form submission logic here
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
