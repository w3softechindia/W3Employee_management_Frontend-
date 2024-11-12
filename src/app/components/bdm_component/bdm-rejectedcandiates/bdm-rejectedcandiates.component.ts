import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';


@Component({
  selector: 'app-bdm-rejectedcandiates',
  templateUrl: './bdm-rejectedcandiates.component.html',
  styleUrls: ['./bdm-rejectedcandiates.component.scss'],
})
export class BdmRejectedcandiatesComponent implements OnInit {
  showDeleteModal: boolean = false;
  rejectedDetails: any[] = [];
  selectedItemToDelete: any;
  selectedEmployeeDetails: any = null;  // Store employee details

  constructor(private bdmService: BdmService) {}  // Inject BdmService

  ngOnInit(): void {
    this.fetchRejectedEmployees(); // Fetch the rejected employees on component initialization
  }

  // Fetch rejected employees from the service
  fetchRejectedEmployees() {
    this.bdmService.getRejectedEmployees().subscribe(  // Use BdmService method
      (data: any[]) => {
        this.rejectedDetails = data;  // Store the fetched rejected employees
      },
      (error: any) => {
        console.error('Error fetching rejected employees:', error);
      }
    );
  }

  // Fetch specific employee details using their employee ID
  fetchEmployeeDetails(employeeId: string) {
    this.bdmService.getEmployeeDetails(employeeId).subscribe(  // Use BdmService method
      (data: any) => {
        this.selectedEmployeeDetails = data;  // Store the fetched employee details
      },
      (error: any) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  // Open the delete confirmation modal
  openDeleteModal(item: any) {
    this.selectedItemToDelete = item;  // Set the item to delete
    this.showDeleteModal = true;  // Show the modal
  }

  // Close the delete confirmation modal
  closeDeleteModal() {
    this.showDeleteModal = false;  // Hide the modal
    this.selectedItemToDelete = null;  // Clear the selected item
  }

  // Delete an employee after confirmation
  deleteItem() {
    if (this.selectedItemToDelete) {
      this.bdmService  // Use BdmService method
        .deleteEmployeeFromTeam(this.selectedItemToDelete.id)
        .subscribe(
          () => {
            // Filter out the deleted employee from the list of rejected details
            this.rejectedDetails = this.rejectedDetails.filter(
              (item) => item.id !== this.selectedItemToDelete.id
            );
            this.closeDeleteModal();  // Close the delete modal
          },
          (error: any) => {
            console.error('Error deleting item:', error);
          }
        );
    }
  }
}
