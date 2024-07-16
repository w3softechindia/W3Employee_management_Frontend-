import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTasksComponent } from './assign-tasks.component';

describe('AssignTasksComponent', () => {
  let component: AssignTasksComponent;
  let fixture: ComponentFixture<AssignTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignTasksComponent]
    });
    fixture = TestBed.createComponent(AssignTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
