import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperEmployeesComponent } from './developer-employees.component';

describe('DeveloperEmployeesComponent', () => {
  let component: DeveloperEmployeesComponent;
  let fixture: ComponentFixture<DeveloperEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperEmployeesComponent]
    });
    fixture = TestBed.createComponent(DeveloperEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
