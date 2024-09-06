
import { Component, OnInit } from '@angular/core';
import { Component } from '@angular/core';


@Component({
  selector: 'app-bdm-navbar',
  templateUrl: './bdm-navbar.component.html',
  styleUrls: ['./bdm-navbar.component.scss']
})
export class BdmNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  switcherClassApplied = false;
  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

}
