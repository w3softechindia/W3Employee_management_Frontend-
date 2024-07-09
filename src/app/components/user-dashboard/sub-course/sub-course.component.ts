import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeService } from 'src/app/employee.service';
import { SubCourse } from 'src/app/Models/SubCourse';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.courseDuration = this.route.snapshot.params['duration'];
    this.initializeClasses(this.courseDuration);
  }

  initializeClasses(count: number): void {
    this.classes = Array.from({ length: count }, () => ({ complete: false }));
  }

  markComplete(index: number): void {
    this.classes[index].complete = true;
  }

  markIncomplete(index: number): void {
    this.classes[index].complete = false;
  }

  fetchMeetingLink(teamName: string): void {
    this.employeeService.getMeetingLinkByTeamName(teamName)
      .subscribe(
        (meetingLink: string) => {
          console.log('Meeting Link:', meetingLink);
          if (meetingLink) {
            window.open(meetingLink, '_blank');
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

  updateStatus() {
    this.employeeService.updateSubCourseStatus(this.subCourseName, this.status)
      .subscribe((data: SubCourse) => {
        this.updatedSubCourse = data;
        console.log('SubCourse status updated:', this.updatedSubCourse);
      }, error => {
        console.error('Error updating SubCourse status:', error);
      });
  }  
}

