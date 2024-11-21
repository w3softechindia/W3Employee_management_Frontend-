import { Component } from '@angular/core';
import { InstructorNavbarComponent } from "../instructor-navbar/instructor-navbar.component";

@Component({
  selector: 'app-pay-comp',
  templateUrl: './pay-comp.component.html',
  styleUrls: ['./pay-comp.component.scss'],
})
export class PayCompComponent {
  isPopupOpen = false;

  openActionPopup() {
    this.isPopupOpen = true;
  }

  closeActionPopup() {
    this.isPopupOpen = false;
  }

  sendMail() {
    console.log('Send Mail clicked');
    this.closeActionPopup();
  }

  rejectMail() {
    console.log('Reject Mail clicked');
    this.closeActionPopup();
  }
}
