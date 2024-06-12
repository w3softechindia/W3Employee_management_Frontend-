import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  employee:Employee=new Employee();
  roleName:string;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
   
  }

  ngOnInit(): void {
    console.log('RegisterPageComponent initialized');
    this.registerForm = this.fb.group({
      employeeId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      webMail: ['', [Validators.required, Validators.email]],
      webMailPassword: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      role: ['', Validators.required]
    });
  }

  addEmployee() {
    
      const employee = this.registerForm.value;
      console.log(employee);
      const roleName = employee.role;
      console.log(roleName);
      this.employeeService.addEmployee(employee, roleName).subscribe(
        (data) => {
          console.log('Employee Registered success..!!!', data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

}


