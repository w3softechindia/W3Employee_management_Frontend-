import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-instructor-courses',
    templateUrl: './instructor-courses.component.html',
    styleUrls: ['./instructor-courses.component.scss']
})
export class InstructorCoursesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}