import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeaveListComponent } from './user-leave-list.component';

describe('UserLeaveListComponent', () => {
  let component: UserLeaveListComponent;
  let fixture: ComponentFixture<UserLeaveListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeaveListComponent]
    });
    fixture = TestBed.createComponent(UserLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
