import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-get-register',
	templateUrl: './get-register.component.html',
	styleUrls: ['./get-register.component.scss']
})
export class GetRegisterComponent implements OnInit {

	constructor(
		public router: Router
	) { }

	ngOnInit(): void {
	}

}