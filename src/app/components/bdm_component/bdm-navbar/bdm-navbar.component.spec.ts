import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmNavbarComponent } from './bdm-navbar.component';

describe('BdmNavbarComponent', () => {
  let component: BdmNavbarComponent;
  let fixture: ComponentFixture<BdmNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BdmNavbarComponent]
    });
    fixture = TestBed.createComponent(BdmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
