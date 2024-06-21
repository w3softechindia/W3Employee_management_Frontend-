import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTrackComponent } from './learning-track.component';

describe('LearningTrackComponent', () => {
  let component: LearningTrackComponent;
  let fixture: ComponentFixture<LearningTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningTrackComponent]
    });
    fixture = TestBed.createComponent(LearningTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
