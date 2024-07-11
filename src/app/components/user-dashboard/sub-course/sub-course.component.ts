import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { SubCourse } from 'src/app/Models/SubCourse';
import { ProgressService } from 'src/app/progress.service';

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
  classes: { complete: boolean }[] = [];
  meetingLink: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private employeeService: EmployeeService,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.courseDuration = this.route.snapshot.params['duration'];
    this.initializeClasses(this.courseDuration);
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

  fetchMeetingLink(teamName: string, index: number): void {
    if (!this.classes[index].complete) {
      this.employeeService.getMeetingLinkByTeamName(teamName).subscribe(
        (meetingLink: string) => {
          console.log('Meeting Link:', meetingLink);
          if (meetingLink) {
            window.open(meetingLink, '_blank');
            this.classes[index].complete = true; 
            this.updateProgress();
          } else {
            alert('No meeting link found for this team.');
          }
        },
        (error) => {
          console.error('Error fetching meeting link:', error);
          alert('Failed to fetch meeting link. Please try again later.');
        }
      );
    }
  }
}
