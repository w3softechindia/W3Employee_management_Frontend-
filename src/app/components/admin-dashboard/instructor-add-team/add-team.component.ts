import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Course } from '../../../Models/Course';
import { EmployeeService } from '../../../employee.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/Models/Employee';
import { Team } from 'src/app/Models/Team';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  teamForm: FormGroup;
  courses: Course[] = [];
  employeeId: string;
  teamLeadId: string;
  teamLeads: Employee[];
  availableEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  teamMembers: Employee[] = [];
  employeeList: Employee[] = [];
  showMeetingLinkInput: boolean = false;
  popupMessage: string | null = null;
  textcolor: string;
  popupIcon: SafeHtml;
  popupTitle: string = '';
  popupType: string = '';
  tickIcon: SafeHtml;
  errorIcon: SafeHtml;
  isSuccess: boolean;
  teamList:Team[];
  teamNames:string[];
  teamNameStatus:boolean;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private auth: AuthService, private sanitizer: DomSanitizer) {
    this.tickIcon = this.sanitizer.bypassSecurityTrustHtml('&#x2713;');
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml('&#9888;');
  }

  ngOnInit(): void {
    this.teamForm = this.fb.group({

      teamName: ['', Validators.required,Validators.minLength(4),Validators.maxLength(20),this.noDirtyDataValidator()],
      teamLeadId:['',Validators.required],

      meetingLink: ['', Validators.required],
      course: this.fb.array([this.addTeamCourse()]),
      employee: this.fb.array([], Validators.required),


    });

    this.fetchCourses();
    this.employeeId = this.auth.getEmployeeId();
    this.getTeamLeads();
    this.getAvailableEmployees();
    // Disable the Add Team button if the employee array is empty
    this.teamForm.valueChanges.subscribe(() => {
      this.validateForm();
    });
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
    this.popupMessage = null;
  }
  createTeamMember(): FormGroup {
    return this.fb.group({
      employeeId: ['', Validators.required],

    });
  }
  noDirtyDataValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[^a-zA-Z0-9 ]/.test(control.value); // Example regex to forbid special characters
      return forbidden ? { 'dirtyData': { value: control.value } } : null;
    };
  }
  addTeamCourse(): FormGroup {
    return this.fb.group({
      courseName: ['', Validators.required] // Ensure this matches your data structure
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

  addTeamMember(): void {
    this.employee.push(this.createTeamMember());
  }

  removeEmployee(index: number): void {
    this.employee.removeAt(index);
    this.validateForm(); // Re-validate the form when an employee is removed
  }
  getAvailableEmployees(): void {
    this.employeeService.getEmployeesNotAdmin().subscribe((data: Employee[]) => {
      this.employeeList = data;

      // Filter employees based on roles "developer" and "tester"
      this.availableEmployees = this.employeeList.filter(employee =>
        employee.roles.some(role =>
          role.roleName === 'Developer' || role.roleName === 'Tester')
      );
      console.log("available emloyees ", this.availableEmployees.length);
    },
      (error: any) => {
        console.log("error in fethcing  employees", error);

      }
    );
  }


  toggleMeetingLinkInput(): void {
    this.showMeetingLinkInput = !this.showMeetingLinkInput;
  }

  validateForm(): void {
    if (this.teamMembers.length < 1) {
      this.teamForm.get('selectedEmployee')?.setErrors({ required: true });
    } else {
      this.teamForm.get('selectedEmployee')?.setErrors(null);
    }
  }

  onSubmit(): void {
    this.validateForm();
    this.teamLeadId = this.teamForm.value.teamLeadId;
    if (!this.teamForm.invalid) {

      const team = this.teamForm.value;
      this.employeeService.addTeam(team, this.teamLeadId).subscribe(
        response => {
          console.log('Team added successfully', response);

          
          this.showSuccess("Team added successfully");
          this.teamForm.reset();


        },
        error => {
          console.error('Error adding team', error);
          this.showError("Team not added");
        }
      );
    }else{
      console.log("fill form currectly");
      this.showError("fill form currectly");
    }
  }

  getTeamLeads() {
    this.employeeService.getEmployeesByRole("TeamLead").subscribe(
      (data: any) => {
        this.teamLeads = data;
        console.log("teamleads are :", this.teamLeads.length);
      },
      (error: any) => {
        console.log("error in fetching teamleads");
      }
    );
  }
  validateTeamName(){
    const teamname=this.teamForm?.get('teamName')?.value;
    this.employeeService.getAllTeam().subscribe(
      (data:any)=>{
        this.teamList=data;
        console.log("getting teamlist",data);
        this.teamNames=this.teamList.map(team=>team.teamName);
        this.teamNameStatus=this.teamNames.includes(teamname);
        console.log("teamNameStatus value",this.teamNameStatus);
      },
      (error:any)=>{
        console.log("error in fetching teams",error);
      }
    );
    }
}
