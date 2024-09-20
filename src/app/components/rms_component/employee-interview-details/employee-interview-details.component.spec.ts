import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInterviewDetailsComponent } from './employee-interview-details.component';

describe('EmployeeInterviewDetailsComponent', () => {
  let component: EmployeeInterviewDetailsComponent;
  let fixture: ComponentFixture<EmployeeInterviewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeInterviewDetailsComponent]
    });
    fixture = TestBed.createComponent(EmployeeInterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
