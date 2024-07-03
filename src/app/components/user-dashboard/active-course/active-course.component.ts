import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-active-course',
  templateUrl: './active-course.component.html',
  styleUrls: ['./active-course.component.scss'],
})
export class ActiveCourseComponent {
  courseName: string;
  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }

  logout(): void {
    this.auth.userLogout();
   }

  switcherClassApplied = false;
  switcherToggleClass() {
    this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
    this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

  // navigation() {
  //   this.router.navigate(['/learning-track', this.courseName]);
  // }
}
