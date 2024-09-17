import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsOnboardingProcessComponent } from './rms-onboarding-process.component';

describe('RmsOnboardingProcessComponent', () => {
  let component: RmsOnboardingProcessComponent;
  let fixture: ComponentFixture<RmsOnboardingProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsOnboardingProcessComponent]
    });
    fixture = TestBed.createComponent(RmsOnboardingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
