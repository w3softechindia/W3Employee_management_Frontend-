import { Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/Models/Employee';
import { Deployment } from 'src/app/Models/deployment';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-bdm-depl',
  templateUrl: './bdm-depl.component.html',
  styleUrls: ['./bdm-depl.component.scss'],
})
export class BdmDeplComponent implements OnInit {
//   // goodEmployees: Deployment[] = [];
//   // averageEmployees: Deployment[] = [];
//   // poorEmployees: Deployment[] = [];
//   // selectedEmployee: Employee | null = null;
//   // isModalOpen: boolean = false;
//   selectedRole = 'Tester';
//   isModalOpen = false;
//   selectedEmployee: any;
//   goodEmployees: Employee[] = [];
//   averageEmployees: Employee[] = [];
//   poorEmployees: Employee[] = [];

 

//   constructor(
//     private bdmService: BdmService,
//     private authService: AuthService,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     // this.loadGoodEmployees();
//     // this.loadAverageEmployees();
//     // this.loadPoorEmployees();
//     // this.fetchEmployees();
//     this.fetchTesters(); 
   
//   }

//   // loadGoodEmployees(): void {
//   //   this.bdmService.getGoodEmployees().subscribe(
//   //     (data) => {
//   //       this.goodEmployees = data;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching good employees:', error);
//   //     }
//   //   );
//   // }

//   // loadAverageEmployees(): void {
//   //   this.bdmService.getAverageEmployees().subscribe(
//   //     (data) => {
//   //       this.averageEmployees = data;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching average employees:', error);
//   //     }
//   //   );
//   // }

//   // loadPoorEmployees(): void {
//   //   this.bdmService.getPoorEmployees().subscribe(
//   //     (data) => {
//   //       this.poorEmployees = data;
//   //     },
//   //     (error) => {
//   //       console.error('Error fetching poor employees:', error);
//   //     }
//   //   );
//   // }

//   showEmployeeDetails(employee: Employee): void {
//     this.selectedEmployee = employee;
//     this.isModalOpen = true;
//   }

//   closeModal(): void {
//     this.isModalOpen = false;
//     this.selectedEmployee = null;
//   }



//     // Fetch testers data
//     fetchTesters() {
//       this.http.get<any[]>('http://localhost:8082/getAllTesters/testers').subscribe(
//         (data) => {
//           this.filterEmployees(data);
//         },
//         (error) => {
//           console.error('Error fetching testers:', error);
//         }
//       );
//     }
  
//     // Fetch developers data
//     fetchDevelopers() {
//       this.http.get<any[]>('http://localhost:8082/getAllDevelopers/developers').subscribe(
//         (data) => {
//           this.filterEmployees(data);
//         },
//         (error) => {
//           console.error('Error fetching developers:', error);
//         }
//       );
//     }
  
//     // Handle button click to select role and fetch corresponding data
//     selectRole(role: string) {
//       this.selectedRole = role;
//       if (role === 'Tester') {
//         this.fetchTesters();
//       } else {
//         this.fetchDevelopers();
//       }
//     }
  
//     // Filter employees by their status
//     filterEmployees(employees: any[]) {
//       this.goodEmployees = employees.filter(emp => emp.status === 'Good');
//       this.averageEmployees = employees.filter(emp => emp.status === 'Average');
//       this.poorEmployees = employees.filter(emp => emp.status === 'Poor');
//     }


//     selectedExperience: string = '';

// filterByExperience() {
//   // Implement logic to filter goodEmployees, averageEmployees, and poorEmployees
//   // based on selectedExperience value, e.g., "0-1", "1-2", "2+"
//   // For example:
//   if (this.selectedExperience === '0-1') {
//     // Filter employees with experience between 0 to 1 year
//   } else if (this.selectedExperience === '1-2') {
//     // Filter employees with experience between 1 to 2 years
//   } else if (this.selectedExperience === '2+') {
//     // Filter employees with experience over 2 years
//   }
// }


  selectedRole = 'Tester';
  isModalOpen = false;
  selectedEmployee: any;
  goodEmployees: Employee[] = [];
  averageEmployees: Employee[] = [];
  poorEmployees: Employee[] = [];
  selectedExperience: string = '';

  constructor(
    private bdmService: BdmService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchTesters(); 
  }

  // Open modal to show employee details
  showEmployeeDetails(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEmployee = null;
  }

  // // Fetch testers data
  // fetchTesters() {
  //   this.http.get<any[]>('http://localhost:8082/getAllTesters/testers').subscribe(
  //     (data) => {
  //       this.filterEmployees(data);
  //     },
  //     (error) => {
  //       console.error('Error fetching testers:', error);
  //     }
  //   );
  // }

  // // Fetch developers data
  // fetchDevelopers() {
  //   this.http.get<any[]>('http://localhost:8082/getAllDevelopers/developers').subscribe(
  //     (data) => {
  //       this.filterEmployees(data);
  //     },
  //     (error) => {
  //       console.error('Error fetching developers:', error);
  //     }
  //   );
  // }

    // Fetch testers
    fetchTesters() : void {
      this.bdmService.fetchTesters().subscribe(
        (data) => {
          this.filterEmployees(data);
        },
        (error) => {
          console.error('Error fetching testers:', error);
        }
      );
    }
  
    // Fetch developers
    fetchDevelopers(): void {
      this.bdmService.fetchDevelopers().subscribe(
        (data) => {
          this.filterEmployees(data);
        },
        (error) => {
          console.error('Error fetching developers:', error);
        }
      );
    }

  // Handle role selection and fetch corresponding data
  selectRole(role: string) {
    this.selectedRole = role;
    if (role === 'Tester') {
      this.fetchTesters();
    } else {
      this.fetchDevelopers();
    }
  }

  // Filter employees by status and experience
  filterEmployees(employees: any[]) {
    const filteredByExperience = this.applyExperienceFilter(employees);

    this.goodEmployees = filteredByExperience.filter(emp => emp.status === 'Good');
    this.averageEmployees = filteredByExperience.filter(emp => emp.status === 'Average');
    this.poorEmployees = filteredByExperience.filter(emp => emp.status === 'Poor');
  }

// Apply experience filter for string-based experience values
applyExperienceFilter(employees: any[]): any[] {
  if (this.selectedExperience === '0-1') {
    return employees.filter(emp => emp.experience === '0-1');
  } else if (this.selectedExperience === '1-2') {
    return employees.filter(emp => emp.experience === '1-2');
  } else if (this.selectedExperience === '2+') {
    return employees.filter(emp => emp.experience === '2+');
  }
  return employees; // Return all if no experience filter is selected
}


  // Apply experience filter on dropdown change
  filterByExperience() {
    if (this.selectedRole === 'Tester') {
      this.fetchTesters();
    } else {
      this.fetchDevelopers();
    }
  }


}
