import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-rms-navbar',
  templateUrl: './rms-navbar.component.html',
  styleUrls: ['./rms-navbar.component.scss']
})
export class RmsNavbarComponent implements OnInit {
  employeeId: string;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;
  currentTime: string = '';
  switcherClassApplied = false;
  sidebarSwitcherClassApplied = false;
  submenuOpen = true;  // Initialize submenu as closed

  constructor(private auth: AuthService, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
      this.employeeId = this.auth.getEmployeeId();
      this.loadPhoto();
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);

      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              this.checkActiveRoute();
          }
      });
  }

  logout(): void {
      this.auth.userLogout();
  }

  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

  toggleSubMenu(event: MouseEvent) {
      event.preventDefault();
      event.stopPropagation(); // Prevent the event from bubbling up
      this.submenuOpen = !this.submenuOpen;
      console.log('Submenu toggled:', this.submenuOpen);
  }

  loadPhoto(): void {
      this.employeeService.getPhoto(this.employeeId).subscribe(
          (data: Blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                  this.photoUrl = reader.result as string;
                  this.isLoading = false;
              };
              reader.readAsDataURL(data);
          },
          (error: any) => {
              console.error('Error loading photo:', error);
              this.isLoading = false;
          }
      );
  }

  private updateTime(): void {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
  }

  checkActiveRoute() {
      if (this.router.url.includes('/rms-onboarding') || this.router.url.includes('/rms-verification')) {
          this.submenuOpen = true;  // Keep submenu open on these routes
      } else {
          this.submenuOpen = false; // Close it otherwise
      }
  }
  
}
