import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventUpdateComponent } from './admin-event-update.component';

describe('AdminEventUpdateComponent', () => {
  let component: AdminEventUpdateComponent;
  let fixture: ComponentFixture<AdminEventUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEventUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminEventUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
