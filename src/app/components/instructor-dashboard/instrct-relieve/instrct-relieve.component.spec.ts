import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrctRelieveComponent } from './instrct-relieve.component';

describe('InstrctRelieveComponent', () => {
  let component: InstrctRelieveComponent;
  let fixture: ComponentFixture<InstrctRelieveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstrctRelieveComponent]
    });
    fixture = TestBed.createComponent(InstrctRelieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
