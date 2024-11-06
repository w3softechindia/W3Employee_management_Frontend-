import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsOnboardingComponent } from './rms-onboarding.component';

describe('RmsOnboardingComponent', () => {
  let component: RmsOnboardingComponent;
  let fixture: ComponentFixture<RmsOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsOnboardingComponent]
    });
    fixture = TestBed.createComponent(RmsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
