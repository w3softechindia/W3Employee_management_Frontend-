import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListtComponent } from './employee-listt.component';

describe('EmployeeListtComponent', () => {
  let component: EmployeeListtComponent;
  let fixture: ComponentFixture<EmployeeListtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListtComponent]
    });
    fixture = TestBed.createComponent(EmployeeListtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
