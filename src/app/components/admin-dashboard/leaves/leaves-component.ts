import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
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

  constructor(private leaveService: EmployeeService) {}

  ngOnInit(): void {
    this.loadAllLeaves();
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
      this.updateLeaveStatus('Approved');
    }
  }

  rejectLeave(): void {
    if (this.selectedLeave?.leaveId !== undefined && confirm('Are you sure you want to reject this leave?')) {
      this.updateLeaveStatus('Rejected');
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

  filterLeaves(status: string = ''): void {
    this.statusFilter = status;
    if (status === 'Approved') {
      this.filteredLeaves = this.leaves.filter(leave => leave.status === 'Approved');
    } else if (status === 'Rejected') {
      this.filteredLeaves = this.leaves.filter(leave => leave.status === 'Rejected');
    } else if (status === 'Not Responded') {
      this.filteredLeaves = this.leaves.filter(leave => !leave.status);
    } else {
      this.filteredLeaves = [...this.leaves]; // Show all leaves if no filter
    }
  }
}
