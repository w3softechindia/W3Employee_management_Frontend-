import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsNavbarComponent } from './rms-navbar.component';

describe('RmsNavbarComponent', () => {
  let component: RmsNavbarComponent;
  let fixture: ComponentFixture<RmsNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsNavbarComponent]
    });
    fixture = TestBed.createComponent(RmsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
