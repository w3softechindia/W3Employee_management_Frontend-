import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterEmployeesComponent } from './tester-employees.component';

describe('TesterEmployeesComponent', () => {
  let component: TesterEmployeesComponent;
  let fixture: ComponentFixture<TesterEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesterEmployeesComponent]
    });
    fixture = TestBed.createComponent(TesterEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
