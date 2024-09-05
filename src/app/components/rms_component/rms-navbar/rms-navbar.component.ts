import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rms-navbar',
  templateUrl: './rms-navbar.component.html',
  styleUrls: ['./rms-navbar.component.scss']
})
export class RmsNavbarComponent  implements OnInit {

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
