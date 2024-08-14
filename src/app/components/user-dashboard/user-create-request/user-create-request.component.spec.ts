import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateRequestComponent } from './user-create-request.component';

describe('UserCreateRequestComponent', () => {
  let component: UserCreateRequestComponent;
  let fixture: ComponentFixture<UserCreateRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCreateRequestComponent]
    });
    fixture = TestBed.createComponent(UserCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
