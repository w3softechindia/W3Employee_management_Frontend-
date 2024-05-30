import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-navbar',
    templateUrl: './user-navbar.component.html',
    styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

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