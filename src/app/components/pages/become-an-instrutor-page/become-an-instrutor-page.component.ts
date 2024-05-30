import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-become-an-instrutor-page',
    templateUrl: './become-an-instrutor-page.component.html',
    styleUrls: ['./become-an-instrutor-page.component.scss']
})
export class BecomeAnInstrutorPageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

}