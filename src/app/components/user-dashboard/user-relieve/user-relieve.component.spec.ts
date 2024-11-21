import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRelieveComponent } from './user-relieve.component';

describe('UserRelieveComponent', () => {
  let component: UserRelieveComponent;
  let fixture: ComponentFixture<UserRelieveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRelieveComponent]
    });
    fixture = TestBed.createComponent(UserRelieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
