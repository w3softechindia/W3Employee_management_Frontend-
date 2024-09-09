import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-bdm-client',
  templateUrl: './bdm-client.component.html',
  styleUrls: ['./bdm-client.component.scss']
})
export class BdmClientComponent implements OnInit {

  items: any[] = [];

  item = {
    companyId: '',
    companyName: '',
    companyStrength: '',
    companyRole: '',
    portalLink: '',
    companyLink: '',
    experience: '',
    jobDescription: '',
    contactNumber: '',
    location: ''
  };

  selectedItem: any = {};
  itemId: number = 0;
  singleItem: any = null;
  error: string | null = null;
  isModalOpen: boolean = false; // Track modal visibility

  constructor(private auth: AuthService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  openModal(item: any): void {
    this.selectedItem = { ...item };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveChanges(id: number): void {
    const updatedItem = {
      name: this.selectedItem.name,
      phno: this.selectedItem.phno,
      city: this.selectedItem.city
    };

    this.employeeService.updateItem(id, updatedItem).subscribe(
      response => {
        console.log('Item updated:', response);
        this.getAllItems(); // Refresh the list after successful update
        this.closeModal();
      },
      error => {
        console.error('Error updating item:', error);
      }
    );
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.employeeService.createItem(this.item).subscribe({
        next: response => {
          console.log('Item created successfully:', response);
          form.resetForm();
          this.getAllItems();
        },
        error: error => {
          console.error('Error creating item:', error);
        }
      });
    }
  }


  getAllItems() {
    this.employeeService.getItems().subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.error('Error fetching items:', error);
      }
    );
  }

  getItemById(id: number) {
    this.employeeService.getItem(id).subscribe(
      data => {
        this.singleItem = data;
      },
      error => {
        console.error('Error fetching item:', error);
      }
    );
  }

  deleteItem(id: number) {
    this.employeeService.deleteItem(id).subscribe(
      response => {
        console.log('Item deleted:', response);
        this.getAllItems(); // Refresh the list
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }
}
