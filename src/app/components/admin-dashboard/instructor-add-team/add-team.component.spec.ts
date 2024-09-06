import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamComponent } from './add-team.component';

describe('AddTeamComponent', () => {
  let component: AddTeamComponent;
  let fixture: ComponentFixture<AddTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeamComponent]
    });
    fixture = TestBed.createComponent(AddTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
