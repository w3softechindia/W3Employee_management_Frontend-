import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-instructors',
    templateUrl: './instructors.component.html',
    styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {

    constructor(
		public router: Router
	) { }

    ngOnInit(): void {
    }

    instructorsSlides: OwlOptions = {
        items: 1,
		nav: true,
		loop: true,
		margin: 30,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			414: {
				items: 1
			},
			576: {
				items: 3
			},
			768: {
				items: 3
			},
			992: {
				items: 3
			},
			1200: {
				items: 3
			}
		}
    }

}