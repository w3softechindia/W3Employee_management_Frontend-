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
  isLoading: boolean | undefined;
  currentTime: string = '';
  switcherClassApplied = false;
  sidebarSwitcherClassApplied = false;
  photoUrl: string | null = null; // Initialize as null

  
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
          localStorage.setItem('photoUrl', this.photoUrl); // Update cache with new photo URL
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      } else {
        alert('Only JPEG and PNG files are allowed.');
      }
    } else {
      console.error('No file selected.');
      this.photoUrl = null; // Clear photo URL if no file is selected
      alert('No file selected.');
    }
  }

  uploadFile(file: File) {
    this.isLoading = true;
    this.employeeService.uploadFile(this.employeeId, file).subscribe(
      (response) => {
        console.log('Upload successful: ', response);
        this.isLoading = false;
      },
      (error) => {
        console.error('Upload failed: ', error);
        alert('Upload failed!');
        this.isLoading = false;
      }
    );
  }
  

 
}