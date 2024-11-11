import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmRejectedcandiatesComponent } from './bdm-rejectedcandiates.component';

describe('BdmRejectedcandiatesComponent', () => {
  let component: BdmRejectedcandiatesComponent;
  let fixture: ComponentFixture<BdmRejectedcandiatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmRejectedcandiatesComponent]
    });
    fixture = TestBed.createComponent(BdmRejectedcandiatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
