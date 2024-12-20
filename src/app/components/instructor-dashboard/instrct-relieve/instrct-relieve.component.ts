import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instrct-relieve',
  templateUrl: './instrct-relieve.component.html',
  styleUrls: ['./instrct-relieve.component.scss']
})
export class InstrctRelieveComponent implements OnInit {
  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  relieveRequests: any[] = []; // Store requests fetched from the backend

  constructor(
    private fb: FormBuilder,
    private leaveService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadRelieveRequests();
  }

  initializeForm() {
    this.leaveForm = this.fb.group({
      leaveType: ['Relieving Request', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), this.noDirtyDataValidator()]]
    });
  }

  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value);
      return forbidden ? { dirtyData: { value: control.value } } : null;
    };
  }

  createLeave() {
    if (this.leaveForm.invalid) {
      this.showPopup = true;
      this.popupTitle = 'Form Incomplete';
      this.popupMessage = 'Please fill in all mandatory fields before submitting.';
      return;
    }
  
    const leaveData = this.leaveForm.value;
    const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService
  
    if (employeeId) {
      this.leaveService.createLeave(leaveData, employeeId).subscribe(
        response => {
          this.showPopup = true;
          this.popupTitle = 'Success';
          this.popupMessage = 'Your request has been submitted successfully!';
          this.loadRelieveRequests(); // Refresh leave data
        },
        error => {
          this.showPopup = true;
          this.popupTitle = 'Fill The Form';
          this.popupMessage = 'There was an error submitting your leave request.';
        }
      );
    }
  }

  loadRelieveRequests() {
    this.leaveService.getRelieveRequests().subscribe(
      (data) => {
        this.relieveRequests = data;
      },
      (error) => {
        console.error('Error fetching relieving requests:', error);
      }
    );
  }

  closePopup() {
    this.showPopup = false;
  }
}
