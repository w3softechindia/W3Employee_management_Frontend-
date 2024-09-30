import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

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
  isSidebarActive = false;
  isSwitcherActive = false;
  
  constructor(private auth: AuthService, private employeeService: EmployeeService) {}
  isMenuExpanded: { [key: string]: boolean } = {
    deploymentInfo: true
  };

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

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.loadPhoto();
    this.updateTime(); // Initialize the time display
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }

  logout(): void {
    this.auth.userLogout();
  }

  switcherClassApplied = false;
  switcherToggleClass() {
    this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
    this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }

  

  // File Upload and Photo Related Code...
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = () => {
          this.photo = reader.result as string;  // Update the photo to display
        };
        reader.readAsDataURL(file);
        this.uploadFile(file);
      } else {
        alert('Only JPEG and PNG files are allowed.');
      }
    } else {
      alert('No file selected.');
    }
  }

  uploadFile(file: File) {
    this.employeeService.uploadFile(this.employeeId, file).subscribe(
      response => {
        console.log('Upload successful: ', response);
      },
      error => {
        console.error('Upload failed: ', error);
        alert('Upload failed!');
      }
    );
  }

  loadPhoto(): void {
    this.employeeService.getPhoto(this.employeeId).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photo = reader.result as string;
        };
        reader.readAsDataURL(data);
      },
      error => {
        console.error('Error loading photo:', error);
      }
    );
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
