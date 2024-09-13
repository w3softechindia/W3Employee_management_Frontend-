import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmDetailsComponent } from './bdm-details.component';

describe('BdmDetailsComponent', () => {
  let component: BdmDetailsComponent;
  let fixture: ComponentFixture<BdmDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmDetailsComponent]
    });
    fixture = TestBed.createComponent(BdmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
