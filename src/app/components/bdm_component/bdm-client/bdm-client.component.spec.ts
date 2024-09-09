import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmClientComponent } from './bdm-client.component';

describe('BdmClientComponent', () => {
  let component: BdmClientComponent;
  let fixture: ComponentFixture<BdmClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmClientComponent]
    });
    fixture = TestBed.createComponent(BdmClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
