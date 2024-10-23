import { Component } from '@angular/core';
import { BdmService } from '../bdm.service';

@Component({
  selector: 'app-bdm-information',
  templateUrl: './bdm-information.component.html',
  styleUrls: ['./bdm-information.component.scss']
})
export class BdmInformationComponent {

  employees: any[] = [];

  constructor(private bdmService: BdmService,) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.bdmService.getEmployees().subscribe(
      (data) => {
        // Map relevant fields here
        this.employees = data.map((employee: any) => ({
          employeeId: employee.employeeId,
          fullName: `${employee.firstName} ${employee.lastName}`,
          roles: employee.roles.map((role: any) => role.roleName), 
          dateOfJoin: employee.dateOfJoin || 'N/A',
          status: employee.status || 'N/A'
        }));

      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

}
