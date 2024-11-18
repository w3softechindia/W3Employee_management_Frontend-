import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementEmpComponent } from './increment-emp.component';

describe('IncrementEmpComponent', () => {
  let component: IncrementEmpComponent;
  let fixture: ComponentFixture<IncrementEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncrementEmpComponent]
    });
    fixture = TestBed.createComponent(IncrementEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
