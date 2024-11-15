import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BdmService } from '../bdm.service';
import { DeploymentStatus } from 'src/app/Models/deployment-status';

import { BdmService } from '../bdm.service';



@Component({
  selector: 'app-bdm-deploymentstatus',
  templateUrl: './bdm-deploymentstatus.component.html',
  styleUrls: ['./bdm-deploymentstatus.component.scss']
})
  showModal = false;
  selectedInterview: any = null;
  selectedRole: string = '';


  constructor(private bdmService: BdmService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Optionally load default data here
    this.filterByRole('Tester'); // Load data for Testers by default
  }

  filterByRole(role: string): void {
    this.selectedRole = role;

    const fetchDeploymentStatus = role === 'Tester'
      ? this.bdmService.getTestersDeploymentStatus()
      : this.bdmService.getDevelopersDeploymentStatus();

    fetchDeploymentStatus.subscribe(
      (data) => {
        // Update interviews list with data from the API
        this.interviews = data;

        // Loop through each interview and fetch client details by clientId
        this.interviews.forEach((interview: DeploymentStatus, index: number) => {
          if (interview.clientId) {
            this.bdmService.getClientDetails(interview.clientId.toString()).subscribe(
              (clientData) => {
                if (clientData) {
                  // Use type assertion to add clientName and clientLocation dynamically
                  (this.interviews[index] as any).clientName = clientData.companyName;
                  (this.interviews[index] as any).clientLocation = clientData.location;
                }
              },
              (error) => {
                console.error('Error fetching client details:', error);
              }
            );
          }
        });

      },
      (error) => {
        console.error(`Error fetching ${role} data:`, error);
      }
    );
  }



  OpenModal(interview: any) {
    this.selectedInterview = { ...interview };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }



          console.error('Error deleting interview:', error);
        }
      );
    }
  }
}

