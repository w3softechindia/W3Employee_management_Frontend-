import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmDeploymentstatusComponent } from './bdm-deploymentstatus.component';

describe('BdmDeploymentstatusComponent', () => {
  let component: BdmDeploymentstatusComponent;
  let fixture: ComponentFixture<BdmDeploymentstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmDeploymentstatusComponent]
    });
    fixture = TestBed.createComponent(BdmDeploymentstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
