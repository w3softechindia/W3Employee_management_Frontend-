import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCompComponent } from './pay-comp.component';

describe('PayCompComponent', () => {
  let component: PayCompComponent;
  let fixture: ComponentFixture<PayCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayCompComponent]
    });
    fixture = TestBed.createComponent(PayCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
