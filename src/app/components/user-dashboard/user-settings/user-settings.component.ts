import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  employee: Employee;

  constructor() { }

  ngOnInit(): void {
  }

}
