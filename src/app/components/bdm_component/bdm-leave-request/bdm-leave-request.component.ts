import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';
import { BdmService } from '../bdm.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bdm-leave-request',
  templateUrl: './bdm-leave-request.component.html',
  styleUrls: ['./bdm-leave-request.component.scss']
})
export class BdmLeaveRequestComponent implements OnInit {

  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  isLeaveFormVisible = true; // Show form initially
  leaves: any[] = []; // Array to store submitted leave requests

  error: string | null = null;
  leaveList: any[] = [];  // List to hold leave data
  isLoading: boolean = false;  // To show loading state
  dataChangeSubscription!: Subscription;



  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private leaveService: EmployeeService,
    private bdmService: BdmService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.fetchLeaves();

    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      customLeaveType: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), this.noDirtyDataValidator()]]
    },
    { validator: this.dateValidator }
  );

    this.leaveForm.get('leaveType')?.valueChanges.subscribe(value => {
      this.onLeaveTypeChange(value);
    });

   
  
  }

  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
  }


     // Custom validator to ensure the end date is not before the start date
  dateValidator(control: FormGroup): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    // Ensure end date is not before start date (allow equal dates)
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { endDateInvalid: true }; // Error if end date is before start date
    }
    return null;
  }

  

  onLeaveTypeChange(leaveType: string) {
    const customLeaveTypeControl = this.leaveForm.get('customLeaveType');
    if (customLeaveTypeControl) {
      if (leaveType === 'Others') {
        customLeaveTypeControl.setValidators(Validators.required);
      } else {
        customLeaveTypeControl.clearValidators();
      }
      customLeaveTypeControl.updateValueAndValidity();
    }
  }

  createLeave() {
    if (this.leaveForm.valid) {
      // const leaveData = this.leaveForm.value;
      const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService
        // Create a new object based on form values to avoid direct mutation
    const leaveData = { ...this.leaveForm.value, status: 'Pending' };

      if (employeeId) {
        this.leaveService.createLeave(leaveData, employeeId).subscribe(
          response => {

            this.showPopup = true;
            this.popupTitle = 'Success';
            this.popupMessage = 'Leave request submitted successfully!';
            console.log("Leave request sent successfully");

               // Reset the form after successful submission
          this.leaveForm.reset(); // Reset the form values
          
          // Optionally set default values for the form
          this.leaveForm.patchValue({
            leaveType: '', // Set the default value for leaveType
            customLeaveType: '', // Set the default value for customLeaveType
            startDate: '', // Set the default value for startDate
            endDate: '', // Set the default value for endDate
            reason: '' // Set the default value for reason
          });
          
          },
          error => {
            this.showPopup = true;
            this.popupTitle = 'Error';
            this.popupMessage = 'There was an error submitting your leave request.';
            console.log("Error in creating leave", error);
          }
        );
      } else {
        console.error("Employee ID is missing");
      }
    }
  }

  closePopup() {
    this.showPopup = false;
  }


   // Show the Leave Request form
   showLeaveForm() {
    this.isLeaveFormVisible = true;
   
  }

  // Show the All Leaves table
  showAllLeaves() {
    this.isLeaveFormVisible = false;
    this.fetchLeaves();
  }

 
  // Handle form submission
  submitLeaveRequest() {
    if (this.leaveForm.valid) {
      this.leaves.push(this.leaveForm.value); // Add submitted form data to the array
      this.leaveForm.reset(); // Reset the form
      this.isLeaveFormVisible = false; // Switch to the All Leaves view
    }
  }

  fetchLeaves(): void {
    const employeeId = this.authService.getEmployeeId(); // Get employee ID from AuthService
  
    if (!employeeId) {
      this.error = 'Employee ID is required';
      return; // Early exit if employee ID is not provided
    }
  
    this.isLoading = true;  // Start loading
    this.error = null;  // Reset error state before making the API call
  
    // Call the leave service to fetch data by employeeId
    this.bdmService.getLeavesByEmployeeId(employeeId).subscribe({
      next: (data: any[]) => {
        // Successfully fetched leave data
        if (Array.isArray(data)) {
          this.leaveList = data;  // Populate the leaveList with the fetched data
        } else {
          this.error = 'Unexpected data format received';  // Handle unexpected data format
        }
        this.isLoading = false;  // Stop loading
        this.cdr.detectChanges(); // Trigger manual change detection
      },
      error: (err: { status: any; statusText: any; }) => {
        // Log the complete error to console for debugging
        console.error('Error fetching leave data:', err);
  
        // Check for specific error details (status code, message, etc.)
        if (err.status) {
          this.error = `Error: ${err.status} - ${err.statusText}`;  // More specific error message
        } else {
          this.error = 'An unknown error occurred. Please try again later.';
        }
        this.isLoading = false;  // Stop loading
        this.cdr.detectChanges(); // Trigger manual change detection
      },
    });
  }
  
  


}
