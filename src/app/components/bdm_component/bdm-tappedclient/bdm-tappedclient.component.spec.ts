import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmTappedclientComponent } from './bdm-tappedclient.component';

describe('BdmTappedclientComponent', () => {
  let component: BdmTappedclientComponent;
  let fixture: ComponentFixture<BdmTappedclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmTappedclientComponent]
    });
    fixture = TestBed.createComponent(BdmTappedclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
