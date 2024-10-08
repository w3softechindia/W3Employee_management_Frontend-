import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { Leave } from 'src/app/Models/Leave';

@Component({
  selector: 'app-leaves-component',
  templateUrl: './leaves-component.html',
  styleUrls: ['./leaves-component.scss']
})
export class LeavesComponentComponent implements OnInit {
  leaves: Leave[] = [];
  filteredLeaves: Leave[] = [];
  selectedLeave: Leave | null = null;
  showDetailsPopup: boolean = false;
  statusFilter: string = '';
  selectedLeaveIds: number[] = [];
  selectedEmployee: Employee | null = null;
  showDetails: boolean = false;
  currentReason: string | null = null;
  showReasonBox: boolean = false;
  positionTop: string = '0px'; // Positioning for demonstration
  positionLeft: string = '0px'; // Positioning for demonstration
  popupMessage:string | null = null;
  textcolor:string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon:SafeHtml;
  isSuccess:boolean;
  constructor(private leaveService: EmployeeService,private sanitizer: DomSanitizer) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;'); 
    this.errorIcon =this.sanitizer.bypassSecurityTrustHtml('&#9888;');
  }

  ngOnInit(): void {
    this.loadAllLeaves();
  }
  showError(message: string) {
    this.popupType = 'error';
   this.popupIcon=this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor= 'red';
    this.isSuccess=false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon=this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
   this.textcolor= '#1bbf72';
   this.isSuccess=true;
  }
  closePopupResult() {
    this.popupMessage = null;
  }
  // Function to show leave reason on mouseover
  showReason(event: MouseEvent, reason: string | undefined) {
    console.log(reason);
    console.log('showing reason');
    if (reason) {
      this.currentReason = reason;
      this.showReasonBox = true;
  
      const target = event.target as HTMLElement;
      if (target) {
        const rect = target.getBoundingClientRect();
        this.positionTop = `${rect.bottom + window.scrollY}px`;
        this.positionLeft = `${rect.left + window.scrollX}px`;
      }
    } else {
      this.currentReason = '';
      this.showReasonBox = false;
    }
  }
  // Function to hide leave reason box on mouseleave
  hideReason() {
    console.log('Hiding reason');
    this.showReasonBox = false;
    this.currentReason = null;
  }
  // Function to track checkbox changes
  onCheckboxChange(leaveId: number| undefined, event: any) {
    if (leaveId !== undefined) {

    if (event.target.checked) {
      this.selectedLeaveIds.push(leaveId);
    } else {
      const index = this.selectedLeaveIds.indexOf(leaveId);
      if (index > -1) {
        this.selectedLeaveIds.splice(index, 1);
      }
    }
  }else{
    console.log("Leave id is undefined");
  }
}

  // Function to approve selected leaves
  approveLeaves() {
    if (this.selectedLeaveIds.length > 0) {
      for (const id of this.selectedLeaveIds) {
        console.log(`Approving leave with ID: ${id}`);
        this.leaveService.approveLeave(id).subscribe(
          (data:any)=>{
            console.log("leave is approved with id:",id);
            this.loadAllLeaves();
            this.filterLeaves();
            this.showSuccess("Leave  approved successfull");
          },
          (error:any)=>{
            console.log("error in approving leave",error);
            this.showError("Approving leave failed");
          }
        );
      
      this.leaveService.updateLeaveStatus(id, "APPROVE").subscribe(
        (data:any)=>{
          console.log("leave status updated successfully");
        },
        (error:any)=>{
          console.log("leave status update failed");
        }
      );
    }
      this.selectedLeaveIds = [];
    
  }else {
      console.log('No leaves selected');
      this.showError("No Leaves selected");
    }
  }

  // Function to reject selected leaves
  rejectLeaves() {
    if (this.selectedLeaveIds.length > 0) {
      for (const id of this.selectedLeaveIds) {
        
 this.leaveService.rejectLeave(id).subscribe(
  (data:any)=>{
    console.log("rejecting leave with id :" ,id);
    this.loadAllLeaves();
    this.filterLeaves();

   
    this.showSuccess("Leave is Rejected Successfully");
  },
  (error:any)=>{
    console.log("error in rejecting leave");
    this.showError("Leave Rejected failed");
  }

 );

 this.leaveService.updateLeaveStatus(id, "REJECT").subscribe(
  (data:any)=>{
    console.log("leave status updated successfully");
  },
  (error:any)=>{
    console.log("leave status update failed");
  }
);
      }
      
      this.selectedLeaveIds = [];
    } else {
      console.log('No leaves selected');
      this.showError("No leaves selected");
    }
  }

  // Function to show employee details when EmployeeId is clicked
  showEmployeeDetails(employeeId: string) {
    this.leaveService.getEmployeeDetails(employeeId).subscribe((data: Employee) => {
      this.selectedEmployee = data;
      this.showDetails = true;
      console.log("getting employee details :",this.selectedEmployee);
    },
    (error:any)=>{
      console.log("error in fetching employeed details : ",error);
    }
  );
  }

  // Function to close the employee details box
  closeDetails() {
    this.showDetails = false;
    this.selectedEmployee = null;
  }
  

  loadAllLeaves(): void {
    this.leaveService.getAllLeaves().subscribe((data: Leave[]) => {
            this.leaves = data;
      this.filterLeaves(); // Apply default filter
    },
    (error:any)=>{
console.log("error in fetching leaves " ,error);
      }
    );
  }

  openLeaveDetails(leave: Leave): void {
    this.selectedLeave = leave;
    this.showDetailsPopup = true;
  }

  closePopup(): void {
    this.showDetailsPopup = false;
    this.selectedLeave = null;
  }

  approveLeave(): void {
    if (this.selectedLeave?.leaveId !== undefined && confirm('Are you sure you want to approve this leave?')) {
      this.updateLeaveStatus('APPROVED');
     this.loadAllLeaves();
    }
  }

  rejectLeave(): void {
    if (this.selectedLeave?.leaveId !== undefined && confirm('Are you sure you want to reject this leave?')) {
      this.updateLeaveStatus('REJECTED');
      this.loadAllLeaves();
    }
  }

  private updateLeaveStatus(status: string): void {
    const leaveId = this.selectedLeave?.leaveId;

    if (leaveId !== undefined && !this.selectedLeave?.status) {
      this.leaveService.updateLeaveStatus(leaveId, status).subscribe({
        next: (updatedLeave) => {
          alert(`Leave ${status.toLowerCase()} successfully!`);
          this.closePopup();
          this.removeLeaveFromList(leaveId); // Remove the leave from the list
          this.loadAllLeaves();
        },
        error: () => console.log(`Failed to ${status.toLowerCase()} the leave.`),
      });
    } else {
      console.log('This leave has already been processed and cannot be updated.');
    }
  }

  private removeLeaveFromList(leaveId: number): void {
    this.leaves = this.leaves.filter(leave => leave.leaveId !== leaveId);
    this.loadAllLeaves(); // Reapply the filter
  }

  filterLeaves(): void {
     
    if (this.statusFilter === 'APPROVED') {
      this.filteredLeaves = this.leaves.filter(leave => leave.status === 'APPROVED');
    } else if (this.statusFilter === 'REJECTED') {
      this.filteredLeaves = this.leaves.filter(leave => leave.status === 'REJECTED');
    } else if (this.statusFilter === 'NOT RESPONDED') {
      this.filteredLeaves = this.leaves.filter(leave =>leave.status === 'NOT RESPONDED');
    } else {
      this.filteredLeaves = [...this.leaves]; // Show all leaves if no filter
    }

   }
  }
