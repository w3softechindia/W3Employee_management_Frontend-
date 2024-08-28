import { Component, OnInit } from '@angular/core';
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

  constructor(private leaveService: EmployeeService) {}

  ngOnInit(): void {
    this.loadAllLeaves();
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
            alert("leave is approved with id :"+id);
          },
          (error:any)=>{
            console.log("error in approving leave",error);
            alert("error in approving leave  :"+error);
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
      alert("No Leaves selected");
    }
  }

  // Function to reject selected leaves
  rejectLeaves() {
    if (this.selectedLeaveIds.length > 0) {
      for (const id of this.selectedLeaveIds) {
        console.log(`Rejecting leave with ID: ${id}`);
 this.leaveService.rejectLeave(id).subscribe(
  (data:any)=>{
    console.log("rejecting leave with id :" ,id);
    this.loadAllLeaves();
    this.filterLeaves();
    alert("rejecting leave with id :  "+id);
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
      alert("No leaves selected");
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
    });
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
      this.filterLeaves();
    }
  }

  rejectLeave(): void {
    if (this.selectedLeave?.leaveId !== undefined && confirm('Are you sure you want to reject this leave?')) {
      this.updateLeaveStatus('REJECTED');
      this.filterLeaves();
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
          this.filterLeaves();
        },
        error: () => alert(`Failed to ${status.toLowerCase()} the leave.`)
      });
    } else {
      alert('This leave has already been processed and cannot be updated.');
    }
  }

  private removeLeaveFromList(leaveId: number): void {
    this.leaves = this.leaves.filter(leave => leave.leaveId !== leaveId);
    this.filterLeaves(); // Reapply the filter
  }

  filterLeaves(): void {
     
    if (this.statusFilter === 'APPROVED') {
      this.filteredLeaves = this.leaves.filter(leave => leave.status === 'APPROVED');
    } else if (this.statusFilter === 'REJECTED') {
      this.filteredLeaves = this.leaves.filter(leave => leave.status === 'REJECTED');
    } else if (this.statusFilter === 'NOT RESPONDED') {
      this.filteredLeaves = this.leaves.filter(leave => !leave.status);
    } else {
      this.filteredLeaves = [...this.leaves]; // Show all leaves if no filter
    }
  //   if (this.statusFilter === 'all') {
  //     this.filteredLeaves = this.leaves;
  //   } else {
  //     this.filteredLeaves = this.leaves.filter(leave => leave.status === this.statusFilter);
  //   }
   }
  }
