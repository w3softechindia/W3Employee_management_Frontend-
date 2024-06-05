import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

    constructor(private auth : AuthService) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.auth.userLogout();
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