import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-achievement',
	templateUrl: './achievement.component.html',
	styleUrls: ['./achievement.component.scss']
})
export class AchievementComponent implements OnInit {

	constructor(
		public router: Router
	) { }

	ngOnInit(): void {
	}

}
