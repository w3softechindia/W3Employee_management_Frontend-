import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

    constructor(
		public router: Router
	) { }

    ngOnInit(): void {}

    testimonialsSlides: OwlOptions = {
        items: 1,
		nav: true,
		loop: true,
		margin: 30,
		dots: false,
		autoplay: true,
		smartSpeed: 1000,
		animateOut: 'fadeOut',
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		]
    }
    testimonialsSlidesTwo: OwlOptions = {
        items: 1,
		loop: true,
		margin: 30,
		nav: false,
		dots: false,
		autoplay: false,
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
			576: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 2
			},
			1200: {
				items: 2
			}
		}
    }

}