import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { ChangeDetectorRef } from '@angular/core';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Employee } from 'src/app/Models/Employee';
import { TitleService } from 'src/app/title.service';


@Component({
  selector: 'app-bdm-navbar',
  templateUrl: './bdm-navbar.component.html',
  styleUrls: ['./bdm-navbar.component.scss']
})
export class BdmNavbarComponent implements OnInit {

   
  employeeId: string;
  photo: any;
error!: string;
currentTime: string = '';
pageTitle: string = 'BDM DASHBOARD'; 
  employee: { firstName: string; lastName: string; };
  fullName: string;



  constructor(private auth : AuthService, private employeeService : EmployeeService,
    private router: Router,private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private titleService: TitleService) { }

  ngOnInit(): void {
      this.employeeId = this.auth.getEmployeeId();
      this.loadPhoto();
      this.updateTime(); // Initialize the time display
      setInterval(() => this.updateTime(), 1000); // Update time every second

       // Listen to navigation events and persist submenu state
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute();
      }
    });


       // Subscribe to the title changes from the service
       this.titleService.title$.subscribe((title: string) => {
        this.pageTitle = title;
      });

      this.employeeId = this.auth.getEmployeeId();
      this.getEmployeeDetails();

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
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }
  

  
  

  // logout(): void {
  //     this.auth.userLogout();
  //    }

  switcherClassApplied = false;
  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

  
// photoUrl: string | undefined;
photoUrl: string = '/assets/images/w3logo.png'; // Default profile image
isLoading: boolean | undefined;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    // Check if the file type is JPEG or PNG
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      // Reader to display the image before uploading
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;  // Update the photoUrl to display the image
      };
      reader.readAsDataURL(file);  // Read the file as a Data URL to display it

      // Optionally upload the file here if needed
      this.uploadFile(file);
    } else {
      alert('Only JPEG and PNG files are allowed.');
    }
  } else {
    console.error('No file selected.');
    // this.photoUrl = undefined;  // Clear previous photo if any
    alert('No file selected.');
  }
}


// Optional: Implement file upload logic here
uploadFile(file: File) {
  this.isLoading = true;  // Set loading to true during upload
  this.employeeService.uploadFile(this.employeeId, file).subscribe(
    response => {
      console.log('Upload successful: ', response);
      this.isLoading = false;  // Set loading to false when done
    },
    error => {
      console.error('Upload failed: ', error);
      alert('Upload failed!');
      this.isLoading = false;  // Set loading to false on error
    }
  );
}

updatePhoto(email: string, photo: File) {
  this.employeeService.updatePhoto(email, photo).subscribe(
    response => {
      console.log('Photo updated successfully:', response);
      // Handle success response here
    },
    error => {
      console.error('Error updating photo:', error);
      // Handle error response here
    }
  );
}


loadPhoto(): void {
  this.employeeService.getPhoto(this.employeeId).subscribe(
    (data: Blob) => {
      console.log('Photo data:', data);
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result as string;
        console.log('Photo URL:', this.photoUrl);
        this.isLoading = false; // Set loading to false when image is loaded
      };
      reader.readAsDataURL(data);
    },
    (error: any) => {
      console.error('Error loading photo:', error);
      this.isLoading = false; // Set loading to false on error
    }
  );
}
private updateTime(): void {
  const now = new Date();
  this.currentTime = now.toLocaleTimeString();
}


submenuOpen = false;
toggleSubMenu(event: Event) {
  event.preventDefault();
  this.submenuOpen = !this.submenuOpen;
}

checkActiveRoute() {
  // Keep submenu open if the route matches
  if (this.router.url.includes('/bdm-details') || this.router.url.includes('/bdm-information')) {
    this.submenuOpen = true;
  } else {
    this.submenuOpen = false;
  }
}

isActiveRoute(routes: string[]): boolean {
  return routes.some(route => this.router.url.includes(route));
}


isModalOpen = false;  // Modal open state

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





 
  userName: string = 'John Doe'; // User's name, replace with actual logic
 



  // Placeholder methods for dropdown options
  onUpdateImage() {
    console.log('Update Image clicked');
    // Implement image update functionality here
  }


 
}