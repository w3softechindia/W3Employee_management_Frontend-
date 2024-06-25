import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrls: ['./task-track.component.scss']
})
export class TaskTrackComponent implements OnInit {
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');

    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#10008;');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  showError(message: string) {
    this.popupType = 'error';
    // this.popupIcon = 'assets/error-icon.png';
    this.popupIcon = this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor = 'red';
    this.isSuccess = false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor = '#1bbf72';
    this.isSuccess = true;
  }
  closePopup() {
    if (
      this.popupMessage ===
      'Your assignment is successfully completed.'
    ) {

    }
    if (
      this.popupMessage ===
      'Your assignment is not finished.'
    ) {
      
    }
    this.popupMessage = null;
  }
}
