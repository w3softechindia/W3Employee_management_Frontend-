import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
    selector: 'app-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

[x: string]: any;

    employeeId: string;
    photo: any;
    // photoUrl: string | undefined;
    photoUrl: string = '/assets/images/w3logo.png'; 
    currentTime: string = '';
    isLoading: boolean | undefined;
    constructor(private auth : AuthService, private employeeService : EmployeeService) { }




    ngOnInit(): void {
        this.employeeId = this.auth.getEmployeeId();
        this.loadPhoto();
        this.updateTime(); // Initialize the time display
    setInterval(() => this.updateTime(), 1000); // Update time every second

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
    //     localStorage.removeItem('employeeId');
    //     localStorage.removeItem('employeePassword');
    //    }

    switcherClassApplied = false;
    switcherToggleClass() {
        this.switcherClassApplied = !this.switcherClassApplied;
    }

    sidebarSwitcherClassApplied = false;
    sidebarSwitcherToggleClass() {
        this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
    }
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
}