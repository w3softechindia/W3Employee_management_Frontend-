import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestListComponent } from './user-request-list.component';

describe('UserRequestListComponent', () => {
  let component: UserRequestListComponent;
  let fixture: ComponentFixture<UserRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRequestListComponent]
    });
    fixture = TestBed.createComponent(UserRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
