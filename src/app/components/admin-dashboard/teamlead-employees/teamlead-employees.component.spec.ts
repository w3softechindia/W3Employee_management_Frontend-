import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamleadEmployeesComponent } from './teamlead-employees.component';

describe('TeamleadEmployeesComponent', () => {
  let component: TeamleadEmployeesComponent;
  let fixture: ComponentFixture<TeamleadEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamleadEmployeesComponent]
    });
    fixture = TestBed.createComponent(TeamleadEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
