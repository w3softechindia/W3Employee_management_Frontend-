import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { Team } from 'src/app/Models/Team';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-instructor-students',
  templateUrl: './instructor-teams.component.html',
  styleUrls: ['./instructor-teams.component.scss']
})
export class InstructorTeamsComponent implements OnInit {
  
  teams: Team[] = []; // Initialize the teams array
  teamForm: FormGroup;
  selectedTeamName: string = '';
  teamNameToDelete: string = '';
  showUpdateModal: boolean = false;
  showDeleteModal: boolean = false;
  courses: Course[] = [];
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private auth: AuthService
  ) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamLeadId: ['', Validators.required],
      meetingLink: ['', Validators.required], // Added meetingLink field
      course: this.fb.array([]),
      employee: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.employeeId = this.auth.getEmployeeId();
    this.employeeService.getAllTeams(this.employeeId).subscribe((data: Team[]) => {
      this.teams = data;
    });

    this.fetchCourses();
  }

  viewTeam(teamName: string): void {
    this.router.navigate(['/team', teamName]);
  }

  createTeamMember(): FormGroup {
    return this.fb.group({
      employeeId: ['', Validators.required]
    });
  }

  addTeamCourse(courseName = ''): FormGroup {
    return this.fb.group({
      courseName: [courseName, Validators.required]
    });
  }

  get employee(): FormArray {
    return this.teamForm.get('employee') as FormArray;
  }

  get course(): FormArray {
    return this.teamForm.get('course') as FormArray;
  }

  fetchCourses(): void {
    this.employeeService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  removeEmployee(index: number): void {
    console.log('Removing employee at index:', index);
    console.log('Current employees:', this.employee.value);
  
    const employeeIdToRemove = this.employee.at(index).value.employeeId;
  
    // Call service method to delete the employee from the team
    this.employeeService.deleteEmployeeFromTeam(employeeIdToRemove).subscribe(
      () => {
        console.log('Employee deleted successfully from team');
        this.employee.removeAt(index); // Remove from form array
      },
      error => {
        console.error('Error deleting employee from team', error);
        // Handle error as needed, e.g., show an alert
      }
    );
  }
  

  openUpdateModal(team: Team): void {
    this.selectedTeamName = team.teamName;
  
    this.showUpdateModal = true;
    // Clear current form arrays
    this.employee.clear();
    this.course.clear();
  
    // Populate the form with the selected team's data
    this.teamForm.patchValue({
      teamName: team.teamName,
      teamLeadId: team.teamLeadId,
      meetingLink: team.meetingLink // Populate meetingLink in the form
    });
  
    document.body.classList.add('show-blur-overlay');
  
    // Populate courses
    team.course.forEach(course => {
      this.course.push(this.addTeamCourse(course.courseName));
    });
  
    // Populate employees
    team.employee.forEach(emp => {
      this.employee.push(this.createTeamMember());
      this.employee.at(this.employee.length - 1).patchValue({ employeeId: emp.employeeId });
    });
  
    this.showUpdateModal = true;
  }
  
  

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  openDeleteModal(teamName: string): void {
    this.teamNameToDelete = teamName;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    this.deleteTeam(this.teamNameToDelete);
    this.closeDeleteModal();
  }

  deleteTeam(teamName: string): void {
    if (confirm(`Are you sure you want to delete team '${teamName}'?`)) {
      this.employeeService.deleteTeam(teamName).subscribe(
        () => {
          this.teams = this.teams.filter(t => t.teamName !== teamName);
          console.log('Team deleted successfully');
          alert("Team deleted successfully");
        },
        error => {
          console.log('Error deleting team', error);
        }
      );
    }
  }

  addTeamMember(): void {
    this.employee.push(this.createTeamMember());
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      const team = this.teamForm.value;
  
      this.employeeService.updateTeam(this.selectedTeamName, team).subscribe(
        response => {
          console.log('Team updated successfully', response);
          alert("Team updated successfully");
          this.showUpdateModal = false; // Close the modal after successful update
          // Optionally, refresh team list or update UI here
        },
        error => {
          console.error('Error updating team', error);
          alert("Team not updated");
        }
      );
    }
  }
  
}
