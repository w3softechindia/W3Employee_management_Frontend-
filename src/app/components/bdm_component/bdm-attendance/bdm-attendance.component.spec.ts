import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmAttendanceComponent } from './bdm-attendance.component';

describe('BdmAttendanceComponent', () => {
  let component: BdmAttendanceComponent;
  let fixture: ComponentFixture<BdmAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmAttendanceComponent]
    });
    fixture = TestBed.createComponent(BdmAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
