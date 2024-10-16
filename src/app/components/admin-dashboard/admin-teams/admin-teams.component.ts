import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _closeDialogVia } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Team } from 'src/app/Models/Team';
import { __makeTemplateObject } from 'tslib';
@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss'],
})
export class AdminTeamsComponent implements OnInit {
  employeeIdStatus: boolean=true;
  goToTeam(teamName: string): void {
    this.router.navigate(['admin-team-details', teamName]);
  }

  teams: Team[] = [];
  currentTeam:Team;
  updatingTeamForm: FormGroup;
  updatingTeam: boolean;
  textcolor: string;
  popupMessage: string | null = null;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;


  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router,private sanitizer: DomSanitizer) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');
    this.errorIcon =this.sanitizer.bypassSecurityTrustHtml('&#9888;');
    
  }

  ngOnInit(): void {
    this.updatingTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamLeadId: ['', Validators.required],
      employees: this.fb.array([]),
      courseName: ['',Validators.required], // Optional
      meetingLink: ['', Validators.required],
    });
    this.getAllTeams();
  }


  showError(message: string) {
    this.popupType = 'error';
    this.popupIcon = this.errorIcon;
    this.popupTitle = 'Error';
    this.popupMessage = message;
    this.textcolor = 'red';
    this.isSuccess = false;
  }

  showSuccess(message: string) {
    this.popupType = 'success';
    this.popupIcon = this.tickIcon;
    this.popupTitle = 'Success';
    this.popupMessage = message;
    this.textcolor = '#1bbf72';
    this.isSuccess = true;
  }

  closePopup() {
    if (this.popupMessage === 'Team successfully updated') {
      this.updatingTeamForm.reset();
    }
    
    this.popupMessage = null;
  }
  closePopup1() {
    this.updatingTeam = false; // or any logic to hide the popup
}
  validateEmployeeId():boolean {
    const employeeId=this.updatingTeamForm?.get('employeeId')?.value;
    let result=false;
    if(employeeId!=null){ 
    
    this.employeeService.checkDuplicateEmployeeId(employeeId).subscribe(
        (data:any)=>{
          result=data;
          this.employeeIdStatus=data;
          console.log("validateEmployeeId method",result);
          return result;
        },
      (error:any)=>{
        console.log(error);
      }
      );
      
    }else{
      console.log("employeeID",employeeId);
    }
      return result;
  }
  getAllTeams() {
    this.employeeService.getAllTeam().subscribe(
      (data: Team[]) => {
        this.teams = data;
        console.log(this.teams);
      },
      (error) => {
        console.error('Error in fetching teams', error);
      }
    );
  }

  setUpdatingTeam(team: Team): void {
   this.updatingTeam=true;
   this.currentTeam=team;
   this.updatingTeamForm.patchValue({
      teamName: team.teamName,
      teamLeadId: team.teamLeadId,
      courseName: team.course[0]?.courseName || '',
      meetingLink: team.meetingLink || '',
    });

    const employeeArray = this.updatingTeamForm.get('employees') as FormArray;
    employeeArray.clear();
    team.employee.forEach(emp => {
      employeeArray.push(this.fb.control(emp.employeeId));
    });
  }

  get employees(): FormArray {
    return this.updatingTeamForm.get('employees') as FormArray;
  }

  addEmployee(): void {
    this.employees.push(this.fb.control(''));
  }

  removeEmployee(index: number): void {
    this.employees.removeAt(index);
      }

  updateTeam(): void {
    // Assuming you have access to the current team and its courses
    const currentCourse = this.currentTeam.course[0]; // Get the current course details
  
    const updatedTeam: Team = {
      teamName: this.updatingTeamForm.value.teamName,
      teamLeadId: this.updatingTeamForm.value.teamLeadId,
      course: [
        {
          ...currentCourse, // Spread the current course to keep its other properties intact
          courseName: this.updatingTeamForm.value.courseName // Update only courseName
        }
      ],
      employee: this.employees.value.map((id: any) => ({ employeeId: id })), // Mapping employee IDs
      meetingLink: this.updatingTeamForm.value.meetingLink,
      tasks: this.currentTeam.tasks || [] // Preserve tasks
      ,
      getEmployeeCount: function (): number {
        throw new Error('Function not implemented.');
      }
    };
  
    console.log("Updating team:", updatedTeam);
  
    this.employeeService.updateTeam(this.currentTeam.teamName, updatedTeam).subscribe(
      (response) => {
        console.log('Team updated successfully', response);
        this.showSuccess("Team successfully updated");
        this.getAllTeams();
      },
      (error) => {
        console.error('Error updating team', error);
        this.showError("Team updating failed");
      }
    );
  }
  
  deleteTeam(teamName: string): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.employeeService.deleteTeam(teamName).subscribe(
        () => {
          this.getAllTeams();
          console.log('Team deleted successfully');
          this.showSuccess("Team deleted successfully");
        },
        (error) => {
          this.showError("Team deleting failed");
          console.error('Error in deleting team', error);
        }
      );
    }
  }
}