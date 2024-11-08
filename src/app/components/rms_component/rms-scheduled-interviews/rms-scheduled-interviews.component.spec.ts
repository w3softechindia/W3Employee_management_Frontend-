import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsScheduledInterviewsComponent } from './rms-scheduled-interviews.component';

describe('RmsScheduledInterviewsComponent', () => {
  let component: RmsScheduledInterviewsComponent;
  let fixture: ComponentFixture<RmsScheduledInterviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsScheduledInterviewsComponent]
    });
    fixture = TestBed.createComponent(RmsScheduledInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
