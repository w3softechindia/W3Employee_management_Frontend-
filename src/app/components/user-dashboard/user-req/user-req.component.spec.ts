import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReqComponent } from './user-req.component';

describe('UserReqComponent', () => {
  let component: UserReqComponent;
  let fixture: ComponentFixture<UserReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReqComponent]
    });
    fixture = TestBed.createComponent(UserReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
