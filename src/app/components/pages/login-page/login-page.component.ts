

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/auth.service';
// import { EmployeeService } from 'src/app/employee.service';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-login-page',
//   templateUrl: './login-page.component.html',
//   styleUrls: ['./login-page.component.scss']
// })
// export class LoginPageComponent implements OnInit {
//   loginData = {
//     employeeId: '',
//     employeePassword: ''
//   };
//   // rememberMe = false;
//   // rememberMeError = '';

//   constructor(private router: Router, private service: EmployeeService, private auth: AuthService) { }

//   ngOnInit(): void {
//   }

//   login(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }

//     this.service.login(this.loginData).subscribe(
//       (data: any) => {
//         const jwtToken = data.jwtToken;
//         const employee = data.employee;
//         const role = employee.roles[0].roleName;

//         this.auth.setToken(jwtToken);
//         this.auth.setRoles([role]);
//         this.auth.setEmployeeId(employee.employeeId);

//         this.redirectBasedOnRole(role);
//       },
//       (error: any) => {
//         console.error('Login error:', error);
//         this.showErrorPopup('Invalid Credentials');
//       }
//     );
//   }


  


//   showErrorPopup(message: string) {
//     alert(message);
//   }

//   redirectBasedOnRole(role: string) {
//     switch (role) {
//       case 'LMS Admin':
//         alert('Welcome Admin');
//         this.router.navigate(['/admin-dashboard']);
//         break;
//       case 'TeamLead':
//         alert('Welcome Team Lead');
//         this.router.navigate(['/instructor-dashboard']);
//         break;
//       case 'Developer':
//       case 'Tester':
//         alert('Welcome Employee');
//         this.router.navigate(['/user-dashboard']);
//         break;
//       case 'RMS Admin':
//         alert('Welcome RMS Admin');
//         this.router.navigate(['/rms-navbar']);
//         break;
//       case 'BDM':
//         alert('Welcome BDM');
//         this.router.navigate(['/bdm-navbar']);
//         break;
//       default:
//         alert('Invalid Role');
//     }
//   }
// }








import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginData = {
    employeeId: '',
    employeePassword: ''
  };

  employeeName: string = ''; // To hold employee name
  employeeId: string = ''; // To hold employee ID
  employeeRole: string = ''; // To hold employee role
  
  isActive: boolean = false; // Track the active form
  private role: string = ''; // To hold the user's role temporarily
  private redirectHandler: () => void; // Store the redirect handler

  constructor(public router: Router, private service: EmployeeService, private auth: AuthService) { }

  ngOnInit(): void {}

  toggleForms() {
    this.isActive = !this.isActive; // Toggle between sign-in and sign-up
  }


  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.service.login(this.loginData).subscribe(
      (data: any) => {
        const jwtToken = data.jwtToken;
        const employee = data.employee;
        const role = employee.roles[0].roleName;
        const employeeId = employee.employeeId;
  
        // Save token, role, and employee ID
        this.auth.setToken(jwtToken);
        this.auth.setRoles([role]);
        this.auth.setEmployeeId(employeeId);
  
        // Set role and employeeId to be used in modal
        this.employeeRole = role;   // Bind this to the modal
        this.employeeId = employeeId; // Bind this to the modal
  

        this.showWelcomeBackModal(role);
        // this.redirectBasedOnRole(role);
      },
      (error: any) => {
        console.error('Login error:', error);
        // this.showErrorPopup('Invalid Credentials');
        this.showErrorPopup();
      }
    );
  }


 

  // showErrorPopup(message: string) {
  //   alert(message);
  // }

  showErrorPopup() {
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
  }

  redirectBasedOnRole(role: string) {
    switch (role) {
      case 'LMS Admin':
        // alert('Welcome Admin');
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'TeamLead':
        // alert('Welcome Team Lead');
        this.router.navigate(['/instructor-dashboard']);
        break;
      case 'Developer':
      case 'Tester':
        // alert('Welcome Employee');
        this.router.navigate(['/user-dashboard']);
        break;
      case 'RMS Admin':
        // alert('Welcome RMS Admin');
        this.router.navigate(['/rms-navbar']);
        break;
      case 'BDM':
        // alert('Welcome BDM');
        this.router.navigate(['/bdm-client']);
        break;
      default:
        alert('Invalid Role');
    }
  }




showWelcomeBackModal(role: string) {
  const modalElement = document.getElementById('welcomeBackModal') as HTMLElement; 
  const modal = new bootstrap.Modal(modalElement);

  // Remove previous event listener if it exists
  if (this.redirectHandler) {
      modalElement.removeEventListener('hidden.bs.modal', this.redirectHandler);
  }

  // Add the redirect handler using the correct role
  this.redirectHandler = () => {
      // console.log('Redirecting based on role:', role); 
      this.redirectBasedOnRole(role);
  };
  modalElement.addEventListener('hidden.bs.modal', this.redirectHandler);

  modal.show();
}


closeModal() {
  const modalElement = document.getElementById('welcomeBackModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide(); // Hide the modal
}



}