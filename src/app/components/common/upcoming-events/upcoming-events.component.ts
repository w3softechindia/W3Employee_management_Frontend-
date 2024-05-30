import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-upcoming-events',
    templateUrl: './upcoming-events.component.html',
    styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {

    constructor(
		public router: Router
    ) { }

    ngOnInit(): void {
    }

}