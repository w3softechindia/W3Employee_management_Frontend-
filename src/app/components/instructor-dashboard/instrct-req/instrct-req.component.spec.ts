import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrctReqComponent } from './instrct-req.component';

describe('InstrctReqComponent', () => {
  let component: InstrctReqComponent;
  let fixture: ComponentFixture<InstrctReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrctReqComponent]
    });
    fixture = TestBed.createComponent(InstrctReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
