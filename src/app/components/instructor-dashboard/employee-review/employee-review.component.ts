import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Deployment } from 'src/app/Models/deployment';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-employee-review',
  templateUrl: './employee-review.component.html',
  styleUrls: ['./employee-review.component.scss'],
})
export class EmployeeReviewComponent implements OnInit {
  employees: Employee[] = [];
  deployments: Deployment[] = [];
  deploymentForm: FormGroup;
  editForm: FormGroup;
  deploymentStatusOptions = ['Good', 'Average', 'Poor'];
  teamLeadId: string = '';
  selectedDeploymentId: number | null = null;
  showEditModal: boolean = false;
  showConfirmModal: boolean = false;
  currentStatus: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the team lead ID from auth service
    this.teamLeadId = this.authService.getEmployeeId(); // Assuming this method exists

    // Initialize the forms
    this.deploymentForm = this.fb.group({
      employeeId: ['', Validators.required],
      deploymentStatus: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      employeeId: [{ value: '', disabled: true }], // Correctly initialize form control with disabled state
      deploymentStatus: ['', Validators.required],
    });

    // Fetch employees and deployments
    this.employeeService.getAllEmployeesByTeamLead(this.teamLeadId).subscribe(
      (data: Employee[]) => (this.employees = data),
      (error) => console.error('Error fetching team lead employees:', error)
    );

    this.employeeService.getDeploymentsByTeamLead(this.teamLeadId).subscribe(
      (data: Deployment[]) => (this.deployments = data),
      (error) => console.error('Error fetching deployments:', error)
    );
  }

  // Handle form submission
  submitForm() {
    if (this.deploymentForm.valid) {
      const { employeeId, deploymentStatus } = this.deploymentForm.value;
      this.employeeService
        .addDeploymentStatus(employeeId, deploymentStatus)
        .subscribe(
          (response) => {
            console.log('Deployment status added:', response);
            alert('Deployment Status success');
            this.deploymentForm.reset();
            this.refreshDeployments();
          },
          (error) => console.error('Error adding deployment status:', error)
        );
    }
  }

  // Open edit modal
  openEditModal(deployment: Deployment) {
    this.selectedDeploymentId = deployment.deploymentId;
    this.currentStatus = deployment.deploymentStatus;
    this.editForm.patchValue({
      employeeId: deployment.employee.employeeId,
      deploymentStatus: deployment.deploymentStatus,
    });
    this.showEditModal = true;
  }

  // Submit update form
  submitUpdate() {
    if (this.editForm.valid && this.selectedDeploymentId !== null) {
      const { deploymentStatus } = this.editForm.value;
      this.employeeService
        .updateDeploymentStatus(this.selectedDeploymentId, deploymentStatus)
        .subscribe(
          (response) => {
            console.log('Deployment status updated:', response);
            this.showEditModal = false;
            this.refreshDeployments();
          },
          (error) => console.error('Error updating deployment status:', error)
        );
    }
  }

  // Open confirmation modal
  openConfirmModal() {
    this.showConfirmModal = true;
  }

  // Confirm update
  confirmUpdate() {
    this.submitUpdate();
    this.showConfirmModal = false;
  }

  // Refresh deployments list
  refreshDeployments() {
    this.employeeService.getDeploymentsByTeamLead(this.teamLeadId).subscribe(
      (data: Deployment[]) => (this.deployments = data),
      (error) => console.error('Error refreshing deployments:', error)
    );
  }
}
