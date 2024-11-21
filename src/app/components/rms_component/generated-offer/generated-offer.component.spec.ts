import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedOfferComponent } from './generated-offer.component';

describe('GeneratedOfferComponent', () => {
  let component: GeneratedOfferComponent;
  let fixture: ComponentFixture<GeneratedOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratedOfferComponent]
    });
    fixture = TestBed.createComponent(GeneratedOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
