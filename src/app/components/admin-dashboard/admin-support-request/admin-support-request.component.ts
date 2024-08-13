import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { SupportRequest } from 'src/app/Models/SupportRequest';

@Component({
  selector: 'app-admin-support-request',
  templateUrl: './admin-support-request.component.html',
  styleUrls: ['./admin-support-request.component.scss']
})
export class AdminSupportRequestComponent implements OnInit{
  supportRequests: any[] = [];

  constructor(private router: Router,private route:ActivatedRoute,private employeeService: EmployeeService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadSupportRequests();
  }

  loadSupportRequests(): void {
    this.employeeService.getAllSupportRequest().subscribe(
      (requests: SupportRequest[]) => {
        this.supportRequests = requests,
        this.formatDateTimes();
        
        console.log("total requests"+this.supportRequests.length);
          },
              (error: any) => {
        console.error('Error fetching support requests', error);
      }
    );
  }
  gotoRequest(ticketId:number){
    console.log('Navigating to request with ID:', ticketId);
this.router.navigate(['/support-request-details',ticketId]);
  }
  formatDateTimes(): void {
    this.supportRequests.forEach(supportRequest => {
      supportRequest.dateTime = this.datePipe.transform(supportRequest.dateTime, 'dd-MM-yyyy HH:mm:ss');
    });
  }
}

