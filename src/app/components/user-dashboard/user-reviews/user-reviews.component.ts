import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-reviews',
    templateUrl: './user-reviews.component.html',
    styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

}