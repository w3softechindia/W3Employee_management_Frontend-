import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';
import { RmsServiceService } from '../rms-service.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-rms-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
})
export class LeavesComponent implements OnInit {
  leave: Leave[] = [];
  selectedList1: data[] = [
    { value: 'Approved' },
    { value: 'Rejected' },
    { value: 'Pending' },
  ];
  public tlApproval: string = '';
  public hrApproval: string = '';
  showPopup = false;
  isLoading: boolean = false;
  showSuccessPopup: boolean = false;
  leaveId:number;

  constructor(
    private leaveService: EmployeeService,
    private rmsLeaveService: RmsServiceService
  ) {}

  ngOnInit(): void {
    this.fetchLeaves();
  }

  fetchLeaves(): void {
    this.leaveService.getLeavesTypes().subscribe(
      (data: Leave[]) => {
        this.leave = data;
      },
      (error: any) => {
        console.error('Error fetching leaves:', error);
      }
    );
  }

  closePopup(): void {
    this.showPopup = false;
    this.tlApproval = '';  // Reset TL Approval
  this.hrApproval = ''; 
  }
  openEditPopup(request: Leave): void {
    this.leaveId=request.leaveId;
    this.showPopup = true;
  }
  confirmEdit() {
    this.leaveService
      .updateLeaveRequest(this.leaveId, this.tlApproval, this.hrApproval)
      .subscribe(
        (data) => {
          console.log(this.leaveId,this.tlApproval,this.hrApproval);
          this.fetchLeaves();
          alert('Updated succesfully..!!');
          this.showPopup = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }
 

isFormValid(): boolean {
  return this.tlApproval !== '' && this.hrApproval !== '';
}

  
}
