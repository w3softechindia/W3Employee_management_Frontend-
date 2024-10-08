import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventDetailsComponent } from './admin-event-details.component';

describe('AdminEventDetailsComponent', () => {
  let component: AdminEventDetailsComponent;
  let fixture: ComponentFixture<AdminEventDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
