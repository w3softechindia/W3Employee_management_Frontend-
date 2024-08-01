import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-navbar',
  templateUrl: './instructor-navbar.component.html',
  styleUrls: ['./instructor-navbar.component.scss'],
})
export class InstructorNavbarComponent implements OnInit {
  employeeId: string;
  error!: string;
  photoUrl: string | null = null; // Initialize as null
  isLoading: boolean = false;

  switcherClassApplied = false;
  sidebarSwitcherClassApplied = false;

  constructor(
    private auth: AuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();

    // Attempt to retrieve the photo URL from local storage
    const cachedPhotoUrl = localStorage.getItem('photoUrl');
    if (cachedPhotoUrl) {
      this.photoUrl = cachedPhotoUrl;
    } else {
      this.loadPhoto(); // Load the photo if not cached
    }
  }

  logout(): void {
    this.auth.userLogout();
    localStorage.removeItem('photoUrl'); // Clear photo URL from cache on logout
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
        this.photoUrl = null; // Clear photo URL on error
        this.isLoading = false;
      }
    );
  }
}
