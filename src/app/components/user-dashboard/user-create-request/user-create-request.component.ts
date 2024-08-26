import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { SupportRequest } from 'src/app/Models/SupportRequest';

@Component({
  selector: 'app-user-create-request',
  templateUrl: './user-create-request.component.html',
  styleUrls: ['./user-create-request.component.scss']
})
export class UserCreateRequestComponent implements OnInit {
  gotoAllRequest() {
    this.router.navigate(['/user-request-list']);
    }
      supportRequestForm: FormGroup;
    
      constructor(
        private fb: FormBuilder,
        private router:Router,
        private authService: AuthService,
        private employeeService: EmployeeService
      ) { }
    
      ngOnInit(): void {
        this.supportRequestForm = this.fb.group({
          subject: ['', Validators.required],
          description: ['', Validators.required],
      
        
        });
      }
    
      onSubmit(): void {
        if (this.supportRequestForm.valid) {
          const newRequest: SupportRequest = this.supportRequestForm.value;
          newRequest.postedBy=this.authService.getEmployeeId();
          this.employeeService.addSupportRequest(newRequest).subscribe(
            (data:any) => {
              alert("request send successfully");
              console.log(' Request Created :', data);
              window.location.reload();
            
            },
            (error:any) => {
              console.error('Error in creating support request:', error);
            alert("request send failed");
            }
          );
        }
      }
    }
    
    
