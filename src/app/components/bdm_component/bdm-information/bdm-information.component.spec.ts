import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmInformationComponent } from './bdm-information.component';

describe('BdmInformationComponent', () => {
  let component: BdmInformationComponent;
  let fixture: ComponentFixture<BdmInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmInformationComponent]
    });
    fixture = TestBed.createComponent(BdmInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
