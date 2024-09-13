import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { BdmService } from '../bdm.service';
import * as bootstrap from 'bootstrap';



@Component({
  selector: 'app-bdm-client',
  templateUrl: './bdm-client.component.html',
  styleUrls: ['./bdm-client.component.scss'],
})
export class BdmClientComponent implements OnInit {

  constructor(private auth: AuthService, private bdmService: BdmService) { }

  items: any[] = [];

  item = {
    // companyId: '',
    companyName: '',
    companyStrength: '',
    companyRole: '',
    portalLink: '',
    companyLink: '',
    experience: '',
    jobDescription: '',
    contactNumber: '',

    location: '',
    countryCode: '+91',
  };

  locations: string[] = [
    'New York, New York',
    'Los Angeles, California',
    'Chicago, Illinois',
    'Houston, Texas',
    'Phoenix, Arizona',
    'San Francisco, California',
    'Seattle, Washington',
    'Miami, Florida',
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bengaluru, Karnataka',
    'Hyderabad, Telangana',
    'Ahmedabad, Gujarat',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Pune, Maharashtra',
    'Jaipur, Rajasthan',
    'Surat, Gujarat',
    'Kanpur, Uttar Pradesh',
    'Nagpur, Maharashtra',
    'Indore, Madhya Pradesh',
    'Thane, Maharashtra',
    'Bhopal, Madhya Pradesh',
    'Visakhapatnam, Andhra Pradesh',
    'Vadodara, Gujarat',
    'Ghaziabad, Uttar Pradesh',
    'Ludhiana, Punjab',
    'Agra, Uttar Pradesh',
    'Nashik, Maharashtra',
    'Faridabad, Haryana',
    'Meerut, Uttar Pradesh',
    'Rajkot, Gujarat',
    'Kalyan, Maharashtra',
    'Aurangabad, Maharashtra',
    'Dhanbad, Jharkhand',
    'Jabalpur, Madhya Pradesh',
    'Amritsar, Punjab',
    'Bhubaneswar, Odisha',
    'Ranchi, Jharkhand',
    'Kota, Rajasthan',
    'Guwahati, Assam',
    'Coimbatore, Tamil Nadu',
    'Mysuru, Karnataka',
    'Trichy, Tamil Nadu',
    'Udaipur, Rajasthan',
    'Jodhpur, Rajasthan',
    'Puducherry, Puducherry',
    'Bhilai, Chhattisgarh',
    'Siliguri, West Bengal',
    'Asansol, West Bengal',
    'Bikaner, Rajasthan',
    'Mangalore, Karnataka',
  ];

  countryCodes = ['+1', '+91', '+44', '+33', '+49'];

  companyStrengthLevels: string[] = [
    '0-50 Employees',
    '51-100 Employees',
    '101-200 Employees',
    '201-500 Employees',
    '501-1000 Employees',
    '1001-5000 Employees',
    '5001+ Employees',
  ];

  experienceLevels: string[] = [];

  selectedRole: string = '';

  companyRoles: string[] = [
    'Developer',
    'Tester',
    'Project Manager',
    'Business Analyst',
    'UI/UX Designer',
    'DevOps Engineer',
    'System Administrator',
    'Database Administrator',
    'Technical Support',
    'Quality Assurance',
  ];

  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole = selectElement.value;
    if (this.selectedRole !== 'Other') {
      this.item.companyRole = this.selectedRole;
    } else {
      this.item.companyRole = '';
    }
  }

  generateExperienceLevels(): void {
    this.experienceLevels = [];
    for (let i = 0; i <= 10; i++) {
      const start = i;
      const end = i + 1;
      const label = i === 10 ? `${start}+ years` : `${start}-${end} years`;
      this.experienceLevels.push(label);
    }
  }

  filteredLocations: string[] = [];

  selectedItem: any = {};

  itemId: number = 0;
  singleItem: any = null;
  error: string | null = null;

  filterLocations() {
    const query = this.item.location ? this.item.location.toLowerCase() : '';
    this.filteredLocations = this.locations.filter((loc) =>
      loc.toLowerCase().includes(query)
    );
  }

  onLocationChange(event: Event) {
    this.filteredLocations = [];
  }

  ngOnInit(): void {
    this.getAllItems();
    this.generateExperienceLevels();
  }
  openModal(item: any): void {
    this.selectedItem = { ...item }; // Clone the item object to avoid direct mutation
    const modalElement = document.getElementById('updateModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  openModal_2(item: any): void {
    this.selectedItem = { ...item }; // Clone the item object to avoid direct mutation
    const modalElement = document.getElementById('updateModal_2');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // CREATE

  onSubmit(form: any): void {
    if (form.valid) {
      this.bdmService.createItem(this.item).subscribe({

        next: response => {
          console.log('Item created successfully:', response);
          alert('Client Registered successfully!');
          form.resetForm();
          this.getAllItems(); 
          const modalElement = document.getElementById('updateModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
     
        },
        error: (error) => {
          console.error('Error creating item:', error);
        },
      });
    }
  }

  getAllItems() {
    this.bdmService.getItems().subscribe(

      data => {
        this.items = data;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  getItemById(id: number) {
    this.bdmService.getItem(id).subscribe(

      data => {
        this.singleItem = data;
      },
      (error) => {
        console.error('Error fetching item:', error);
      }
    );
  }

  // UPDATE
  saveChanges(companyId: any): void {
    const updatedItem = {

      companyName: this.selectedItem.companyName,
      companyStrength: this.selectedItem.companyStrength,
      companyRole: this.selectedItem.companyRole,
      companyLink: this.selectedItem.companyLink,
      portalLink: this.selectedItem.portalLink,
      experience: this.selectedItem.experience,
      location: this.selectedItem.location,
      contactNumber: this.selectedItem.contactNumber,
      jobDescription: this.selectedItem.jobDescription,
      countryCode: this.selectedItem.countryCode,
    };


    this.bdmService.updateItem(companyId, updatedItem).subscribe(
      response => {
        console.log('Item updated:', response);
        alert('Client Registered Updated successfully!');

        this.getAllItems(); // Refresh the list after successful update
        const modalElement = document.getElementById('updateModal_2');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      },
      (error) => {
        console.error('Error updating item:', error);

      }
    );
  }


  selectedCompany: any;

  viewItem(item: any) {
    this.selectedCompany = {
      name: item.companyName,
      strength: item.companyStrength,
      jobDescription: item.jobDescription,
      link: item.companyLink
    };
  }
  

  deleteItem(item: any): void {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this Client?');
    
    // If user confirms deletion
    if (confirmDelete) {
      // Call performDelete to actually delete the item
      this.performDelete(item.companyId);  // Ensure you're passing the correct ID here
    }
  }

  
  performDelete(companyId: string): void {
    this.bdmService.deleteItem(companyId).subscribe(
      response => {
        console.log('Item deleted successfully:', response);
        this.getAllItems();  // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting item:', error);
        console.log('Full error details:', error);
      }
    );
  }
  }
