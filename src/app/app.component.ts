import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Edon - Angular 16+ LMS & Online Courses Theme';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() 
  {
    this.checkAuth();
  }

  checkAuth() {
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');
    if (this.authService.isLoggedIn() && role) {
      // Redirect based on the role
      switch (role) {
        case 'Admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'TeamLead':
          this.router.navigate(['/instructor-dashboard']);
          break;
        case 'Developer':
        case 'Tester':
          this.router.navigate(['/user-dashboard']);
          break;
        default:
          this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }
  
}
