import { Component } from '@angular/core';
import { BdmService } from '../bdm.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bdm-details',
  templateUrl: './bdm-details.component.html',
  styleUrls: ['./bdm-details.component.scss']
})
export class BdmDetailsComponent {

  clients: any[] = []; 
  selectedStatus: string = '';
  selectedRole: string = '';
  employeeList: any[] = [];
  selectedEmployee: string = ''; 
  employeeDetails: any;
  isFormValid: boolean = false;

  constructor(private clientService: BdmService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getClients();
  
  }

  getClients() {
    this.clientService.getAllClients().subscribe((data: any[]) => {
      this.clients = data; // Store the data in the clients array
    }, (error) => {
      console.error('Error fetching clients:', error);
    });
  }
 
  

    // Check if both role and status are selected
    checkFormValidity() {
      this.isFormValid = this.selectedStatus !== '' && this.selectedRole !== '';
      if (this.isFormValid) {
        this.fetchEmployeeDetails(); // Automatically fetch details when valid
      }
    }
  
    // Fetch employee details from the service
    fetchEmployeeDetails() {
      this.clientService.getEmployeesByRoleAndStatus(this.selectedRole, this.selectedStatus)
        .subscribe((data) => {
          this.employeeList = data;
        }, (error) => {
          console.error('Error fetching employee details:', error);
        });
    

}

formSubmitted: boolean = false;

viewResume(employeeId: string) {
  if (employeeId) {
    console.log(`Viewing resume for Employee ID: ${employeeId}`);
    // Logic to view the resume, e.g., navigate to resume page or open modal with resume details.
  }
}


}