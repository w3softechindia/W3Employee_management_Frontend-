import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-instructor-navbar',
    templateUrl: './instructor-navbar.component.html',
    styleUrls: ['./instructor-navbar.component.scss']
})
export class InstructorNavbarComponent implements OnInit {

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