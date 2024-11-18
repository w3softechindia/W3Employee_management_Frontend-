import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { TitleService } from 'src/app/title.service';

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
  
  // Track individual submenu states
  deploymentSubmenuOpen = false; // Default is closed
  employeesSubmenuOpen = false;  // Default is closed

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

  // Toggling for Deployment submenu
  toggleDeploymentSubMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.deploymentSubmenuOpen = !this.deploymentSubmenuOpen;
    console.log('Deployment submenu toggled:', this.deploymentSubmenuOpen);
  }

  // Toggling for Employees submenu
  toggleEmployeesSubMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.employeesSubmenuOpen = !this.employeesSubmenuOpen;
    console.log('Employees submenu toggled:', this.employeesSubmenuOpen);
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

  // checkActiveRoute() {
  //   // Adjust submenu state based on the current active route
  //   if (this.router.url.includes('/rms-onboarding') || this.router.url.includes('/rms-verification')) {
  //     this.deploymentSubmenuOpen = true;  // Keep Deployment submenu open on these routes
  //   } else {
  //     this.deploymentSubmenuOpen = false; // Close it otherwise
  //   }
  // }


  checkActiveRoute() {
    // Adjust submenu state based on the current active route
    const url = this.router.url;
    
    // Check for Deployment submenu routes
    if (url.includes('/rms-onboarding') || url.includes('/rms-verification')) {
      this.deploymentSubmenuOpen = true;
    } else {
      this.deploymentSubmenuOpen = false;
    }
  
    // Check for Employees submenu routes
    if (url.includes('/rms-list') || url.includes('/pay-slips')) {
      this.employeesSubmenuOpen = true;
    } else {
      this.employeesSubmenuOpen = false;
    }
  }
  

 
}