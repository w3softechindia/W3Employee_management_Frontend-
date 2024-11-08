import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsVerificationComponent } from './rms-verification.component';

describe('RmsVerificationComponent', () => {
  let component: RmsVerificationComponent;
  let fixture: ComponentFixture<RmsVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsVerificationComponent]
    });
    fixture = TestBed.createComponent(RmsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
