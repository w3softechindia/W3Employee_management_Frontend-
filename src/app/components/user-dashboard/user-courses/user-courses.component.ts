import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-courses',
    templateUrl: './user-courses.component.html',
    styleUrls: ['./user-courses.component.scss']
})
export class UserCoursesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}