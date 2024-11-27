import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsEmployeeListComponent } from './rms-employee-list.component';

describe('RmsEmployeeListComponent', () => {
  let component: RmsEmployeeListComponent;
  let fixture: ComponentFixture<RmsEmployeeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsEmployeeListComponent]
    });
    fixture = TestBed.createComponent(RmsEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
