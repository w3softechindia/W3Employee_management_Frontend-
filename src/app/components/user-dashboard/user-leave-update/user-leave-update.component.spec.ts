import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeaveUpdateComponent } from './user-leave-update.component';

describe('UserLeaveUpdateComponent', () => {
  let component: UserLeaveUpdateComponent;
  let fixture: ComponentFixture<UserLeaveUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeaveUpdateComponent]
    });
    fixture = TestBed.createComponent(UserLeaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
