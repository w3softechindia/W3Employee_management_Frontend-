import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamDetailsComponent } from './admin-team-details.component';

describe('AdminTeamDetailsComponent', () => {
  let component: AdminTeamDetailsComponent;
  let fixture: ComponentFixture<AdminTeamDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTeamDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
