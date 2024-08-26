import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadAttendanceTrackComponent } from './teamlead-attendance-track.component';

describe('TeamleadAttendanceTrackComponent', () => {
  let component: TeamleadAttendanceTrackComponent;
  let fixture: ComponentFixture<TeamleadAttendanceTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamleadAttendanceTrackComponent]
    });
    fixture = TestBed.createComponent(TeamleadAttendanceTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
