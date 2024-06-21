import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCourseComponent } from './active-course.component';

describe('ActiveCourseComponent', () => {
  let component: ActiveCourseComponent;
  let fixture: ComponentFixture<ActiveCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveCourseComponent]
    });
    fixture = TestBed.createComponent(ActiveCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
