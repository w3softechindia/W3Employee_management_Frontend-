import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  courseName: any;
  value: number = 0;
  max: number = 100;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private progressService: ProgressService
  ) {}

  ngOnInit() {
    this.courseName = localStorage.getItem('course');
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
        this.courses = data.subCourses;
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
      const completed = classes.filter((c: { complete: any; }) => c.complete).length;
      this.progressService.updateProgress(completed, classes.length);
    }
  }

  navigation(duration: number) {
    this.router.navigate(['/sub-course', duration]);
  }
}



