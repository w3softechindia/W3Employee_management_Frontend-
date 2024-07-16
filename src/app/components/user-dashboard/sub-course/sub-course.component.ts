import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { SubCourse } from 'src/app/Models/SubCourse';
import { ProgressService } from 'src/app/progress.service';
import { Team } from 'src/app/Models/Team';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss'],
})
export class SubCourseComponent implements OnInit {
  subCourseName: string;
  status: string;
  updatedSubCourse: SubCourse;
  courseDuration: number;
  classes: any[] = [];
  teamName: any;
  team: Team;
  errorMessage: string;

 
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private employeeService: EmployeeService,
    private progressService: ProgressService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.courseDuration = this.route.snapshot.params['duration'];
   
    this.initializeClasses(this.courseDuration);
    this.teamName = localStorage.getItem('teamName');
    const employeeId = this.auth.getEmployeeId();
    if (employeeId) {
      this.employeeService.getTeamByEmployeeId(employeeId).subscribe(
        (team: Team) => {
          this.team = team;
        },
        (error) => {
          this.errorMessage = 'Failed to load team information.';
        }
      );
    } else {
      this.errorMessage = 'Employee ID not found.';
    }
  }

  initializeClasses(count: number): void {
    this.classes = Array.from({ length: count }, () => ({ complete: false }));
    this.updateProgress();
  }

  markComplete(index: number): void {
    if (!this.classes[index].complete) {
      this.classes[index].complete = true;
      this.updateProgress();
    }
  }
  updateProgress(): void {
    const completed = this.classes.filter(c => c.complete).length;
    this.progressService.updateProgress(completed, this.classes.length);
  }

  openMeetingLink(link: string): void {
    window.open(link, '_blank');
  }
}