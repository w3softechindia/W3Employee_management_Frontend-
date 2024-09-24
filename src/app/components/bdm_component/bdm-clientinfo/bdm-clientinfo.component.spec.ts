import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmClientinfoComponent } from './bdm-clientinfo.component';

describe('BdmClientinfoComponent', () => {
  let component: BdmClientinfoComponent;
  let fixture: ComponentFixture<BdmClientinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmClientinfoComponent]
    });
    fixture = TestBed.createComponent(BdmClientinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
