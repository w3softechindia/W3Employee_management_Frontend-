import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseDetailsComponent } from './admin-course-details.component';

describe('AdminCourseDetailsComponent', () => {
  let component: AdminCourseDetailsComponent;
  let fixture: ComponentFixture<AdminCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
