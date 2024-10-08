import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-bdm-navbar',
  templateUrl: './bdm-navbar.component.html',
  styleUrls: ['./bdm-navbar.component.scss']
})
export class BdmNavbarComponent implements OnInit {

 
  isSidebarActive = false;
  isSwitcherActive = false;
   
  employeeId: string;
  photo: any;
error!: string;
currentTime: string = '';
  constructor(private auth : AuthService, private employeeService : EmployeeService) { }

  ngOnInit(): void {
      this.employeeId = this.auth.getEmployeeId();
      this.loadPhoto();
      this.updateTime(); // Initialize the time display
      setInterval(() => this.updateTime(), 1000); // Update time every second

  }
  isMenuExpanded: { [key: string]: boolean } = {
    deploymentInfo: true
  };

  logout(): void {
      this.auth.userLogout();
     }
     toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
    }
    
    toggleSwitcher() {
      this.isSwitcherActive = !this.isSwitcherActive;
    }
  
    toggleMenu(menu: string) {
      this.isMenuExpanded[menu] = !this.isMenuExpanded[menu];
    }
  
    onSubmenuItemClick() {
      this.isSidebarActive = true; // Close the sidebar on click
    }

  switcherClassApplied = false;
  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

  
photoUrl: string | undefined;
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
    this.photoUrl = undefined;  // Clear previous photo if any
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

}
