import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/Models/Course';


@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.scss']
})
export class CourseDetailModalComponent implements OnInit {
  @Input() course: Course | null = null;
  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  openModal(course: Course): void {
    this.course = course;
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }
}
