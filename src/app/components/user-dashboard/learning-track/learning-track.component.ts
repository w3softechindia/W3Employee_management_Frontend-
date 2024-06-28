import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/Course';
import { SubCourse } from 'src/app/Models/SubCourse';
import { Team } from 'src/app/Models/Team';
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
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.courseName = localStorage.getItem('courseName');
    this.loadCourseByName();
  }

  // Load Course by course Name
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
  private updateCourseProgress(): void {
    for (let i = 0; i < this.courses.length; i++) {
      if (i > 0 && this.courses[i - 1].value >= 100) {
        this.courses[i].value = Math.min(this.courses[i].value + 20, 100); 
      }
    }
  }
}
