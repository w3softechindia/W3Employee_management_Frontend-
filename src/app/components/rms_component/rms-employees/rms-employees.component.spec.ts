import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsEmployeesComponent } from './rms-employees.component';

describe('RmsEmployeesComponent', () => {
  let component: RmsEmployeesComponent;
  let fixture: ComponentFixture<RmsEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsEmployeesComponent]
    });
    fixture = TestBed.createComponent(RmsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
