import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { Leave } from 'src/app/Models/Leave';

@Component({
  selector: 'app-user-leave-list',
  templateUrl: './user-leave-list.component.html',
  styleUrls: ['./user-leave-list.component.scss']
})
export class UserLeaveListComponent implements OnInit {
  leaves: Leave[] = [];
  constructor(private router: Router,private employeeService: EmployeeService){
    
  }
  ngOnInit(): void {
   this.loadAllLeaves(); 
  }

  loadAllLeaves(): void {
    this.employeeService.getAllLeaves().subscribe((data: Leave[]) => {
            this.leaves = data;

    },
    (error:any)=>{
console.log("error in fetching leaves " ,error);
      }
    );
  }
  updateRequest(leaveId:number){

    this.router.navigate(['/user-leave-update',leaveId]);
    }
}
