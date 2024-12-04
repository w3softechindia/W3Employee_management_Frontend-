import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.scss']
})
export class AdminEmployeesComponent implements OnInit {
  employeeId: string;
  photo: any;
  // photoUrl: string | undefined;
  photoUrl: string = '/assets/images/humaaan-3.png';
  isLoading: boolean | undefined;
  employeeList: Employee[];
  employees: Employee[];
  selectedEmployee: any;
  constructor(private employeeService: EmployeeService, private authService: AuthService,
    private router: Router) { }
  ngOnInit(): void {
    this.getAllEmployeeDetails();

  }
  // showEmployeeDetails(employee: any) {
  //   this.selectedEmployee = employee;
  // }

  hideEmployeeDetails() {
    this.selectedEmployee = null;
  }

  switcherClassApplied = false;
  switcherToggleClass() {
    this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
    this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }


  gotoDeveloper() {
    this.router.navigate(['/developer-employees']);
  }
  gotoTeamLead() {
    this.router.navigate(['/teamlead-employees']);
  }
  gotoTester() {
    this.router.navigate(['/tester-employees']);
  }
  getAllEmployeeDetails() {

    this.employeeService.getEmployeesNotAdmin().subscribe(
      (res: Employee[]) => {
        this.employeeList = res;
        this.employees = this.employeeList.filter(employee =>
          employee.roles.some(role =>
            role.roleName === 'Developer' || role.roleName === 'Tester' || role.roleName === 'TeamLead'
          )
        );
        console.log(" no of employees", this.employees.length);
        this.employees.forEach(employee => {
          this.loadPhoto(employee);
        });

        console.log("employee details", this.employees.length);
      },
      (error: any) => {
        console.log("error in fetching employees ", error);

      }
    );
  }

  getEmployeesByRole(roleName: string): void {
    this.employeeService.getEmployeesByRole(roleName).subscribe(
      (data: Employee[]) => {
        this.employees = data;

      },
      (error) => {
        console.error('Error fetching employees', error);
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
          console.log('Photo URL:', this.photoUrl);
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
