import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalEmployees: number;
  totalTeamLeads: number;
  totalDevelopers: number;
  totalTesters: number;
  totalCourses: number;
  totalTeams: number;
  teamLeads: Employee[];
  employees: Employee[];
  photo: any;
  // photoUrl: string | undefined;
  photoUrl: string = '/assets/images/humaaan-3.png';
  isLoading: boolean | undefined;
  activeTable: string = 'users'; 

  constructor(private employeeService: EmployeeService, private router: Router) { }
  ngOnInit(): void {

    this.getTotalCourses();
    this.getTotalTeams();
    this.getTotalEmployeesByRole("TeamLead", (data) => this.totalTeamLeads = data);
    this.getTotalEmployeesByRole("Developer", (data) => this.totalDevelopers = data);
    this.getTotalEmployeesByRole("Tester", (data) => this.totalTesters = data);
    this.getEmployeesByRole("TeamLead");
    this.getEmployeesByRole("Developer");
    this.getEmployeesByRole("Tester");
  }

  toggleTable(table: string): void {
    this.activeTable = table;
  }
  
  relatedCoursesSlides = {
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  };


  switcherClassApplied = false;
  switcherToggleClass() {
    this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
    this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }
  navigateToCourses(): void {
    this.router.navigate(['/admin-courses']);
  }
  navigateToDevelopers(): void {
    this.router.navigate(['/developer-employees']);
  }
  navigateToTesters(): void {
    this.router.navigate(['/tester-employees']);
  }
  navigateToTeamLeads(): void {
    this.router.navigate(['/teamlead-employees']);
  }
  navigateToTeams(): void {
    this.router.navigate(['/admin-teams']);
  }



  getTotalEmployeesByRole(roleName: string, callback: (data: number) => void): void {
    this.employeeService.getTotalEmployeesByRole(roleName).subscribe(
      (data: number) => {
        callback(data);
        console.log(`Total ${roleName}s: ${data}`);
      },
      (error: any) => {
        console.error(`Error fetching ${roleName}s`, error);
      }
    );
  }
  getTotalCourses(): void {
    this.employeeService.getTotalCourses().subscribe(
      (data: any) => {
        this.totalCourses = data;
        console.log(`Total Courses: ${data}`);
      },
      (error) => {
        console.error('Error in fetching total courses', error);
      }
    );
  }
  getTotalTeams(): void {
    this.employeeService.getTotalTeams().subscribe(
      (data: any) => {
        this.totalTeams = data;
        console.log(`Total Teams: ${data}`);
      },
      (error) => {
        console.error('Error in fetching total teams', error);
      }
    );
  }
  getEmployeesByRole(roleName: string): void {


    this.employeeService.getEmployeesByRole(roleName).subscribe(
      (data: Employee[]) => {
        if (roleName == "TeamLead") {
          this.teamLeads = data;
          this.teamLeads.forEach(teamLead => {
            this.loadPhoto(teamLead);
          });
          console.log(" teamleads details are : ", this.teamLeads?.length);
        }
        if (roleName == "Developer") {

          this.employees = data;
          this.employees.forEach(employee => {
            this.loadPhoto(employee);
          });
          console.log("developers details are :", this.employees?.length);
        }
        if (roleName == "Tester") {

          this.employees.concat(data);
          this.employees.forEach(employee => {
            this.loadPhoto(employee);
          });
          console.log("employees details are", this.employees?.length);
        }
      },
      (error) => {
        console.error('Error in fetching employees', error);
      }
    );
  }


  loadPhoto(employee: Employee): void {
    this.employeeService.getPhotoAdmin(employee.employeeId).subscribe(
      (data: Blob) => {
        console.log('Photo data:', data);

        const reader = new FileReader();
        reader.onload = () => {
          employee.photoUrl = reader.result as string;
          console.log('Photo URL:', employee.photoUrl);
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


  showEmployeeDetails(emp: any) {
    Swal.fire({
      title: 'Employee Details', // Title text (without any extra styling)
      html: `
        <div style="text-align: center; margin-top: 10px;">
          <p><strong>Employee ID:</strong> ${emp.employeeId}</p>
          <p><strong>Full Name:</strong> ${emp.firstName} ${emp.lastName}</p>
          <p><strong>Address:</strong> ${emp.address}</p>
          <p><strong>Email:</strong> ${emp.employeeEmail}</p>
          <p><strong>Phone Number:</strong> ${emp.phoneNumber}</p>
          <p><strong>Employee Role:</strong> 
            ${emp.roles
          ?.map((role: { roleName: string }) => role.roleName)
          .join(', ') || 'N/A'
        }
          </p>
          <p><strong>Employee Status:</strong> ${emp.status}</p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Close',
      showCloseButton: true, // Remove the X button
      icon: undefined, // Removes the default icon
      customClass: {
        popup: 'custom-popup', // Custom class for the popup container
      },
      didOpen: () => {
        // Apply custom styles to the title and remove padding from the title div
        const swalTitle = document.querySelector('.swal2-title');
        if (swalTitle) {
          swalTitle.setAttribute('style', 'padding: 15px; background-color: #4caf50; color: white;  text-align: center;');
        }

        // Apply inline styles after the modal has opened to remove padding from the body
        const modalBody = document.querySelector('.swal2-html-container');
        if (modalBody) {
          modalBody.setAttribute('style', 'padding: 0 !important; margin: 0 !important;');
        }
      },
    });
  }


}