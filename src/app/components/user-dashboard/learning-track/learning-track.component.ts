import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { SubCourse } from 'src/app/Models/SubCourse';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-learning-track',
  templateUrl: './learning-track.component.html',
  styleUrls: ['./learning-track.component.scss'],
})
export class LearningTrackComponent implements OnInit {
  courses: SubCourse[];
  courseName: any;
  @Input() value: number = 30;
  @Input() max: number = 100;
  subCourses: any;
  @Input() courseDuration: number;
  classes: { complete: boolean }[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseName = localStorage.getItem('course'); // Retrieve courseName from localStorage
    if (!this.courseName) {
      console.error('No courseName available in localStorage.');
      return;
    }
    this.loadCourseByName();
  }

  private loadCourseByName(): void {
    this.employeeService.getCourseByCourseName(this.courseName).subscribe(
      (data: Course) => {
        this.courses = data.subCourses;
        console.log(this.courses);
      },
      (error) => {
        console.error('Error fetching course:', error);
      }
    );
  }

  navigation(duration:number) {
    this.router.navigate(['/sub-course', duration]); 
  }
}
