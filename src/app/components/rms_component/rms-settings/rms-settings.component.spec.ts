import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsSettingsComponent } from './rms-settings.component';

describe('RmsSettingsComponent', () => {
  let component: RmsSettingsComponent;
  let fixture: ComponentFixture<RmsSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsSettingsComponent]
    });
    fixture = TestBed.createComponent(RmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
