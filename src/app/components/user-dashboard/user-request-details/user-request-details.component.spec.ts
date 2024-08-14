import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestDetailsComponent } from './user-request-details.component';

describe('UserRequestDetailsComponent', () => {
  let component: UserRequestDetailsComponent;
  let fixture: ComponentFixture<UserRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(UserRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
