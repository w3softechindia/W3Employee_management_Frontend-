import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './user-settings.component.html',
 styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  employeeForm: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      webEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeePassword: ['', Validators.required]
    });
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Perform the update action here
    } else {
      console.log('Form is invalid');
    }
  }
}

