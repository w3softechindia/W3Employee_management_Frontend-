import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestComponent } from './user-request.component';

describe('UserRequestComponent', () => {
  let component: UserRequestComponent;
  let fixture: ComponentFixture<UserRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestComponent]
    });
    fixture = TestBed.createComponent(UserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
