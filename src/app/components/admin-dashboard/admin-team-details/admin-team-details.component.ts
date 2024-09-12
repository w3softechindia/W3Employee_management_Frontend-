import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Models/Employee';
import { Team } from 'src/app/Models/Team';

@Component({
  selector: 'app-admin-team-details',
  templateUrl: './admin-team-details.component.html',
  styleUrls: ['./admin-team-details.component.scss']
})
export class AdminTeamDetailsComponent implements OnInit {
  teamName:string;
  team:Team;
  teamLead:Employee;
  employees:Employee[];
  teamLeadId:string;
  photo: any;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;
  constructor(private employeeService:EmployeeService,private  router:Router,private route:ActivatedRoute) { }
  ngOnInit(): void {
  this.teamName=this.route.snapshot.params['teamName'];  
  this.getTeamDetails(this.teamName);
  
  }
  switcherClassApplied = false;
  switcherToggleClass() {
      this.switcherClassApplied = !this.switcherClassApplied;
  }

  sidebarSwitcherClassApplied = false;
  sidebarSwitcherToggleClass() {
      this.sidebarSwitcherClassApplied = !this.sidebarSwitcherClassApplied;
  }
getTeamDetails(teamName:string){
this.employeeService.getTeamByName(teamName).subscribe(
  (data:Team)=>{
    this.team=data;
    this.teamLeadId=this.team.teamLeadId;
    this.getTeamLead(this.teamLeadId);
 this.employees=this.team.employee;
 this.employees.forEach(employee => {
  this.loadPhoto(employee);
});  
    console.log(this.team);

  },
    (error:any)=>{
      console.log("error in fetching team details",error);
    })
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
      this.isLoading=false;
    }
  );
}
getTeamLead(employeeId:string){
  console.log("teamlead id :",employeeId);
  
  this.employeeService.getEmployeeDetails(employeeId).subscribe(
    (data:any)=>{
      this.teamLead=data;
      console.log("teamlead details",this.teamLead.employeeId);
    },
    (error:any)=>{
      console.log("error in fetching teamlead",error);
    }
  )
}
}
