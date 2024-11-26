import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmClienthistoryComponent } from './bdm-clienthistory.component';

describe('BdmClienthistoryComponent', () => {
  let component: BdmClienthistoryComponent;
  let fixture: ComponentFixture<BdmClienthistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmClienthistoryComponent]
    });
    fixture = TestBed.createComponent(BdmClienthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
