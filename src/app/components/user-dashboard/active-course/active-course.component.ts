import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    this.courseName=this.route.snapshot.params['courseName']
  }

  switcherClassApplied = false;
  switcherToggleClass() {
    this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
    this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

  navigation() {
    this.router.navigate(['/learning-track', this.courseName]);
  }
}
