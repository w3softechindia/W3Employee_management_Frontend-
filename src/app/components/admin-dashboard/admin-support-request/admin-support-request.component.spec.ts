import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupportRequestComponent } from './admin-support-request.component';

describe('AdminSupportRequestComponent', () => {
  let component: AdminSupportRequestComponent;
  let fixture: ComponentFixture<AdminSupportRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSupportRequestComponent]
    });
    fixture = TestBed.createComponent(AdminSupportRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
