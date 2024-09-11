import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmDeplComponent } from './bdm-depl.component';

describe('BdmDeplComponent', () => {
  let component: BdmDeplComponent;
  let fixture: ComponentFixture<BdmDeplComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmDeplComponent]
    });
    fixture = TestBed.createComponent(BdmDeplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
