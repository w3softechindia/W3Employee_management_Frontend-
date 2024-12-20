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


  constructor(private auth: AuthService, private bdmService: BdmService) {
    this.filteredItems = [...this.items]; 
    
   }

   search = {
    companyName: '',
    companyRole: '',
    location: ''
  };



  // filteredItems = [...this.items]; 

  showPagination: boolean = true; 
  filteredItems: any[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 7;
 


  items: any[] = [];
  
  selectedCompany: any;

  item = {
    companyId: '',
    companyName: '',
    companyStrength: '',
    companyRole: '',
    referencePerson: '',
    companyLink: '',
    referencePersonEmail: '',
    experience: '',
    jobDescription: '',
    contactNumber: '', 
    location: '',
    countryCode: '+91',
  };

  locations: string[] = [
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


  selectedItem: any = {
    countryCode: '+91',  // Set default country code to +91
  };

  countryCodes = [ '+91', '+44', '+33', '+49','040'];

  companyStrengthLevels: string[] = [
    '0-50',
    '51-100',
    '101-200',
    '201-500',
    '501-1000',
    '1001-5000',
    '5001+',
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

  filteredLocations: string[] = [];

 
  

  itemId: number = 0;
  singleItem: any = null;
  error: string | null = null;

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
      const label = i === 10 ? `${start}` : `${start}-${end}`;
      this.experienceLevels.push(label);
    }
  }

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




  onSubmit(form: any): void {
    if (form.valid) {
      this.bdmService.createItem(this.item).subscribe({
        next: response => {
          console.log('Item created successfully:', response);
  
          // Show the success modal with a checkmark
          const successModal = new bootstrap.Modal(document.getElementById('AddClientModal'));
          successModal.show();
  
          // Reset the form
          form.resetForm();
  
          // Refresh the items list
          this.getAllItems();
  
          // Close the update modal if it's open
          const modalElement = document.getElementById('updateModal');
          if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance?.hide();
          }
        },
        error: error => {
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


// Update the Client details
  saveChanges(companyId: any): void {
    console.log('Before saving:', this.selectedItem);
    const updatedItem = {
      companyName: this.selectedItem.companyName,
      companyStrength: this.selectedItem.companyStrength,
      companyRole: this.selectedItem.companyRole,
      companyLink: this.selectedItem.companyLink,
      // portalLink: this.selectedItem.portalLink,
      // companyEmail: this.selectedItem.companyEmail,
      referencePerson: this.selectedItem.referencePerson,
      referencePersonEmail: this.selectedItem.referencePersonEmail,
      experience: this.selectedItem.experience,
      location: this.selectedItem.location,
      contactNumber: this.selectedItem.contactNumber,
      jobDescription: this.selectedItem.jobDescription,
      countryCode: this.selectedItem.countryCode,
    };
  
    this.bdmService.updateItem(companyId, updatedItem).subscribe(
      response => {
        console.log('Item updated:', response);
  
        // Trigger the success modal instead of alert
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
  
        // Refresh the items
        this.getAllItems();
  
        // Close the update modal if it's open
        const modalElement = document.getElementById('updateModal_2');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      },
      error => {
        console.error('Error updating item:', error);
      }
    );
  }
  

  viewItem(item: any) {
    this.selectedCompany = {
      name: item.companyName,
      strength: item.companyStrength,
      jobDescription: item.jobDescription,
      link: item.companyLink,

      // companyemail: item.companyEmail,
      referenceperson: item.referencePerson,
      referencepersonemail: item.referencePersonEmail,
      location: item.location,
      contactno: item.contactNumber
    };

  }

  performDelete(companyId: string): void {
    this.items = this.items.filter(item => item.companyId !== companyId); 
    
    this.bdmService.deleteItem(companyId).subscribe(
      response => {

        this.getAllItems();  // Optionally re-fetch the list to ensure it's up to date

      },
      (error) => {
        console.error('Error deleting item:', error);
        this.getAllItems();  
      }
    );
  }
  
  openDeleteModal(item: any) {
    this.selectedItem = item;  // Store the selected item
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();  // Show the delete confirmation modal
  }
  
  confirmDelete(): void {
    if (this.selectedItem) {
      this.performDelete(this.selectedItem.companyId);  
    }
  
    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
    deleteModal.hide();  // Hide the modal after confirming deletion
  }
  
  
  filterItems() {
   
       this.filteredItems = this.items.filter(item => {
      const companyNameMatch = item.companyName.toLowerCase().includes(this.search.companyName.toLowerCase());
      const companyRoleMatch = item.companyRole.toLowerCase().includes(this.search.companyRole.toLowerCase());
      const locationMatch = item.location.toLowerCase().includes(this.search.location.toLowerCase());

      return companyNameMatch && companyRoleMatch && locationMatch;
    });
    this.currentPage = 1;
    this.showPagination = !(this.search.companyName || this.search.companyRole || this.search.location);
  }


  


}

