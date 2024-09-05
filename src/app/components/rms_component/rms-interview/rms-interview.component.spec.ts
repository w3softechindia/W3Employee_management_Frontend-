import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsInterviewComponent } from './rms-interview.component';

describe('RmsInterviewComponent', () => {
  let component: RmsInterviewComponent;
  let fixture: ComponentFixture<RmsInterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsInterviewComponent]
    });
    fixture = TestBed.createComponent(RmsInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
