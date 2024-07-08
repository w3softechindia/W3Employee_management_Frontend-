import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCourseComponent } from './sub-course.component';

describe('SubCourseComponent', () => {
  let component: SubCourseComponent;
  let fixture: ComponentFixture<SubCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCourseComponent]
    });
    fixture = TestBed.createComponent(SubCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
