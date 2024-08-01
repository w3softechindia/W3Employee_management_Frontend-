import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { SubCourse } from 'src/app/Models/SubCourse';
import { AuthService } from 'src/app/auth/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { ProgressService } from 'src/app/progress.service';

@Component({
  selector: 'app-learning-track',
  templateUrl: './learning-track.component.html',
  styleUrls: ['./learning-track.component.scss'],
})
export class LearningTrackComponent implements OnInit {
  courses: SubCourse[];
  courseName: string = ''; // Initialize courseName with an empty string
  value: number = 0;
  max: number = 100;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private auth: AuthService,
    private progressService: ProgressService
  ) {}

  ngOnInit() {
    this.courseName = localStorage.getItem('course') || ''; // Provide a default value
    if (!this.courseName) {
      console.error('No courseName available in localStorage.');
      return;
    }
    this.loadCourseByName();

    this.progressService.progress$.subscribe((progress) => {
      this.value = progress;
    });
    this.progressService.totalSubCourses$.subscribe((total) => {
      this.max = total * 50;
    });

    this.loadSavedProgress();
  }

  private loadCourseByName(): void {
    this.employeeService.getCourseByCourseName(this.courseName).subscribe(
      (data: Course) => {
        this.courses = data.subCourses.map((sc) => {
          let subCourse = new SubCourse();
          subCourse.subCourseName = sc.subCourseName;
          subCourse.subCourseDuration = sc.subCourseDuration;
          subCourse.progress = sc.progress;
          subCourse.value = sc.value;
          subCourse.progressStatus = sc.progressStatus;
          subCourse.complete = sc.complete;
          subCourse.course = sc.course;
          subCourse.sessions = sc.sessions;
          subCourse.max = sc.max;
          subCourse.certified = sc.certified;
          subCourse.updateAvailable = sc.updateAvailable;
          return subCourse;
        });
        console.log(this.courses);
      },
      (error) => {
        console.error('Error fetching course:', error);
      }
    );
  }

  private loadSavedProgress(): void {
    const savedClasses = localStorage.getItem('classes');
    if (savedClasses) {
      const classes = JSON.parse(savedClasses);
      const completed = classes.filter(
        (c: { complete: any }) => c.complete
      ).length;
      this.progressService.updateProgress(completed, classes.length);
    }
  }

  navigation(duration: number) {
    this.router.navigate(['/sub-course', duration]);
  }
}
