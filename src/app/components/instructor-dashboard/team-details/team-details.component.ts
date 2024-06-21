import { Component } from '@angular/core';
import { Team } from '../../../Models/Team';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../employee.service';
import { Employee } from 'src/app/Models/Employee';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {
  employees: Employee[];
  team:Team;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }


  ngOnInit(): void {
    const teamName = this.route.snapshot.params['teamName'];
    if (teamName) {
      this.employeeService.getTeamByName(teamName).subscribe((data: Team) => {
        console.log(data);
        this.team=data;
        this.employees = this.team.employee;
      });
    }
}
deleteEmployee(employeeId: string) {
  this.employeeService.deleteEmployeeFromTeam(employeeId).subscribe(data => {
    console.log(data);
    location.reload();
  }, error => {
    console.error('Error deleting employee:', error);
  });
}
}