import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './user-settings.component.html',
 styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  employee: Employee;
  employeeId: string;

  constructor( private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('employeeId');
        if (id) {
          this.employeeId = id;
          this.updateEmployeeDetails();
        }
      });
    }
    
    
  updateEmployeeDetails(): void {
    if (this.employeeId && this.employee) {
      this.employeeService.updateEmployeeDetails(this.employeeId, this.employee).subscribe(
        (data: Employee) => {
          console.log('Employee updated successfully', data);
        },
        (error: any) => {
          console.error('Error updating employee details', error);
        }
      );
    } else {
      console.error('Employee ID or data is missing');
    }
  }
}