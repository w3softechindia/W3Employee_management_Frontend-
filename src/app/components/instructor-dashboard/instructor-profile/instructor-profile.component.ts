import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.scss']
})
export class InstructorProfileComponent implements OnInit {

  employee: Employee | undefined;
  errorMessage: string | undefined;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId')!;
    this.employeeService.getTlDetails(employeeId).subscribe({
      next: (data) => this.employee = data,
      error: (err) => this.errorMessage = err.error.message
    });

    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error(err)
    });

}
}
