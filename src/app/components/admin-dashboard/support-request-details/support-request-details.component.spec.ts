import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRequestDetailsComponent } from './support-request-details.component';

describe('SupportRequestDetailsComponent', () => {
  let component: SupportRequestDetailsComponent;
  let fixture: ComponentFixture<SupportRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(SupportRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
