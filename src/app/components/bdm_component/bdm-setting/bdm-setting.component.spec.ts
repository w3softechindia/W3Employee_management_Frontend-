import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmSettingComponent } from './bdm-setting.component';

describe('BdmSettingComponent', () => {
  let component: BdmSettingComponent;
  let fixture: ComponentFixture<BdmSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmSettingComponent]
    });
    fixture = TestBed.createComponent(BdmSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
