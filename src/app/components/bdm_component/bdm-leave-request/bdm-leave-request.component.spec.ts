import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmLeaveRequestComponent } from './bdm-leave-request.component';

describe('BdmLeaveRequestComponent', () => {
  let component: BdmLeaveRequestComponent;
  let fixture: ComponentFixture<BdmLeaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmLeaveRequestComponent]
    });
    fixture = TestBed.createComponent(BdmLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
