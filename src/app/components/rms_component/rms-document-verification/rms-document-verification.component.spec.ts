import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsDocumentVerificationComponent } from './rms-document-verification.component';

describe('RmsDocumentVerificationComponent', () => {
  let component: RmsDocumentVerificationComponent;
  let fixture: ComponentFixture<RmsDocumentVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RmsDocumentVerificationComponent]
    });
    fixture = TestBed.createComponent(RmsDocumentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
