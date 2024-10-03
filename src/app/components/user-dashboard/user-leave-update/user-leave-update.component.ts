import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';

@Component({
  selector: 'app-user-leave-update',
  templateUrl: './user-leave-update.component.html',
  styleUrls: ['./user-leave-update.component.scss']
})
export class UserLeaveUpdateComponent implements OnInit{
  leaveForm: FormGroup;
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  leaveId:number;
  currentLeave:Leave;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService // Updated service name
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      customLeaveType: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required,Validators.minLength(6), Validators.maxLength(100)]
    });

    this.leaveForm.get('leaveType')?.valueChanges.subscribe(value => {
      this.onLeaveTypeChange(value);
    });
    this.leaveId=this.route.snapshot.params['leaveId'];
    this.getLeave(this.leaveId);
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

  updateLeave() {
    if (this.leaveForm.valid) {
      const leaveData = this.leaveForm.value;

      this.employeeService.updateLeave(leaveData);

        this.showPopup = true;
        this.popupTitle = 'Success';
        this.popupMessage = 'Leave request updated successfully!';
        console.log("Leave request updated successfully");
      
        
        // (error:any) => {
        //   this.showPopup = true;
        //   this.popupTitle = 'Error';
        //   this.popupMessage = 'Error in updating leave request.';
        //   console.log("error in updating Leave",error);
        // }
      
    }
  }
getLeave(leaveId:number){
  this.employeeService.getLeaveById(leaveId).subscribe(
    (data:any)=>{
this.currentLeave=data;
// this.eventForm.patchValue({
//   subject: this.event.subject,
//   description: this.event.description,
//   dateTime:this.event.dateTime
  

});
// console.log("getting leave :",this.currentLeave);
//     },
//     (error:any)=>{
//       console.log("error in fetching leave ",error);
//     }
//   )
// }
  // closePopup() {
  //   this.showPopup = false;
  // }
}
}

