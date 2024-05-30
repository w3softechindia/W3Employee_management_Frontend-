import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-courses',
    templateUrl: './admin-courses.component.html',
    styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}