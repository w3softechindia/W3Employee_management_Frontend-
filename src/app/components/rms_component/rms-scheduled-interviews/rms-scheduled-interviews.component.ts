import { Component } from '@angular/core';

@Component({
  selector: 'app-rms-scheduled-interviews',
  templateUrl: './rms-scheduled-interviews.component.html',
  styleUrls: ['./rms-scheduled-interviews.component.scss']
})
export class RmsScheduledInterviewsComponent {
  employees = [
    { name: 'John Doe', email: 'john@example.com', status: 'Completed', interviewDate: new Date() },
    { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', interviewDate: new Date() }
  ];

  showPopup: boolean = false;
  selectedEmployee: any = null;

  openEditPopup(employee: any) {
    this.selectedEmployee = employee;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedEmployee = null;
  }

  approveAction() {
    // Logic to approve the interview
    console.log('Approved:', this.selectedEmployee.name);
    this.closePopup();
  }

  rejectAction() {
    // Logic to reject the interview
    console.log('Rejected:', this.selectedEmployee.name);
    this.closePopup();
  }
}