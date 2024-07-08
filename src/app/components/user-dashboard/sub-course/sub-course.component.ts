import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCourse } from 'src/app/Models/SubCourse';


@Component({
  selector: 'app-sub-course',
  templateUrl: './sub-course.component.html',
  styleUrls: ['./sub-course.component.scss'],
})
export class SubCourseComponent implements OnInit {
  
  courseDuration: number;
  showMeetingLinkInput: boolean = false;
  classes: { complete: boolean }[] = [];
  meetingLink: string = 'https://meet.google.com/sfi-ezdx-qvf';

  constructor(private route: ActivatedRoute) {}


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
  generateClasses(duration: number): any[] {
    return Array.from({ length: duration }, () => ({ complete: true }));
  }
  openLink(link: string): void {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('Please enter a valid Google Meet link.');
    }
  }
 }
