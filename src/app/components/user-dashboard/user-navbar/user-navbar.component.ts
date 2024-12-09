import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
    selector: 'app-user-navbar',
    templateUrl: './user-navbar.component.html',
    styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {
  [x: string]: any;
  employeeId: string;
  error!: string;
  // photoUrl: string | null = null; 
  photoUrl: string = '/assets/images/w3logo.png'; 
  isLoading: boolean = false;
  currentTime: string = '';
  submenuOpen = false;
  isModalOpen = false;  // Modal open state



  switcherClassApplied = false;
  sidebarSwitcherClassApplied = false;
  activeSubMenu: string | null = null;

  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.updateTime(); // Initialize the time display
    setInterval(() => this.updateTime(), 1000); // Update time every second


    // Attempt to retrieve the photo URL from local storage
    const cachedPhotoUrl = localStorage.getItem('photoUrl');
    if (cachedPhotoUrl) {
      this.photoUrl = cachedPhotoUrl;
    } else {
      this.loadPhoto(); // Load the photo if not cached
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute();
      }
    });


    this.getEmployeeDetails();
  }

  
  toggleSubMenu(event: Event) {
    event.preventDefault();
    this.submenuOpen = !this.submenuOpen;
  }
  logout(): void {
    this.auth.userLogout();
    localStorage.removeItem('photoUrl'); // Clear photo URL from cache on logout
  }
  isActiveRoute(routes: string[]): boolean {
    return routes.some(route => this.router.url.includes(route));
  }


  switcherToggleClass() {
    this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherToggleClass() {
    this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
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
      // this.photoUrl = null; 
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

  loadPhoto(): void {
    this.isLoading = true;
    this.employeeService.getPhoto(this.employeeId).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
          localStorage.setItem('photoUrl', this.photoUrl); // Cache the photo URL
          this.isLoading = false;
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        // this.photoUrl = null; 
        this.isLoading = false;
      }
    );
  }
  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
}
checkActiveRoute() {
  // Keep submenu open if the route matches
  if (this.router.url.includes('/bdm-details') || this.router.url.includes('/bdm-information')) {
    this.submenuOpen = true;
  } else {
    this.submenuOpen = false;
  }
}
// Open the modal
openModal() {
  this.isModalOpen = true;
}
 // Close the modal
 closeModal() {
  this.isModalOpen = false;
}

// Handle logout confirmation
confirmLogout() {

  this.auth.userLogout();
  this.router.navigate(['/login']);


  // Close the modal after logout
  this.isModalOpen = false;
}


getEmployeeDetails() {
  this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
    (res: Employee) => {
      // Extract only the firstName and lastName from the response
      const firstName = res.firstName;
      const lastName = res.lastName;
      const empId = res.employeeId;

      // Store these values in the component for further use
      this.employee = { firstName, lastName,  };

      

      // If you want to use the employee name in your template:
      this.fullName = `${firstName} ${lastName}`;
      this.employeeId = `${empId}`;
    },
    (error: any) => {
      console.log(error);
      this.showError('Failed to load employee details.');
    }
  );
}

}
