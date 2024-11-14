import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySlipsComponent } from './pay-slips.component';

describe('PaySlipsComponent', () => {
  let component: PaySlipsComponent;
  let fixture: ComponentFixture<PaySlipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaySlipsComponent]
    });
    fixture = TestBed.createComponent(PaySlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
