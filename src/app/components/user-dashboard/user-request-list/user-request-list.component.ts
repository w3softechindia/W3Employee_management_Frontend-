import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-user-request-list',
  templateUrl: './user-request-list.component.html',
  styleUrls: ['./user-request-list.component.scss']
})
export class UserRequestListComponent implements OnInit{
  supportRequests: any[]=[];
  constructor(private router: Router,private employeeService :EmployeeService,private datePipe: DatePipe){}
  ngOnInit(): void {
 this.getAllSupportRequest();
}
updateRequest(ticketId:number){

this.router.navigate(['/user-request-update',ticketId]);
}
gotoRequest(ticketId:number) {
this.router.navigate(['user-request-details',ticketId]);
}
gotoRequests(){
  this.router.navigate(['user-create-request']);
}
getAllSupportRequest(){
 this.employeeService.getAllSupportRequest().subscribe(
    (data:any)=>{
      this.supportRequests=data;
     this.formatDateTimes();
      console.log(this.supportRequests);
          },
          (error:any)=>{
            console.log("error in fetching details",error);
          }
  );
}
formatDateTimes(): void {
  this.supportRequests.forEach(request => {
    request.dateTime = this.datePipe.transform(request.dateTime, 'dd-MM-yyyy HH:mm:ss');
  });
}
}

