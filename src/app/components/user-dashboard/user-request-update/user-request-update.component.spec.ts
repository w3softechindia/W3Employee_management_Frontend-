import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestUpdateComponent } from './user-request-update.component';

describe('UserRequestUpdateComponent', () => {
  let component: UserRequestUpdateComponent;
  let fixture: ComponentFixture<UserRequestUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestUpdateComponent]
    });
    fixture = TestBed.createComponent(UserRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
