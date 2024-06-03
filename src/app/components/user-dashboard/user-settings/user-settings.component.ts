import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  employee: Employee;

  constructor(private employeeService:EmployeeService) { 
  }

  ngOnInit(): void {
  }

// update details of employee
updateEmployeeDetails(): void {
  this.employeeService.updateEmployeeDetails(this.employee.employeeId, this.employee)
    .subscribe(
      (response) => {
        this.updateEmployeeDetails = response;
        alert('Employee details updated successfully!');
      },
      (error) => {
        console.error('Error updating employee details:', error);
        alert('Error updating employee details: ' + error.message);
      }
    );
}

}
