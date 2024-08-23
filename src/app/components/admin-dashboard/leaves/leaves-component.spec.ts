import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesComponentComponent } from './leaves-component';

describe('LeavesComponentComponent', () => {
  let component: LeavesComponentComponent;
  let fixture: ComponentFixture<LeavesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesComponentComponent]
    });
    fixture = TestBed.createComponent(LeavesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
