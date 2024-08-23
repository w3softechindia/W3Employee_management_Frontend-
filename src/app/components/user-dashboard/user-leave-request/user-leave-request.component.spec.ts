import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeaveRequestComponent } from './user-leave-request.component';

describe('UserLeaveRequestComponent', () => {
  let component: UserLeaveRequestComponent;
  let fixture: ComponentFixture<UserLeaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeaveRequestComponent]
    });
    fixture = TestBed.createComponent(UserLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
