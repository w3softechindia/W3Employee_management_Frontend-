import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentVerificationFormComponent } from './document-verification-form.component';

describe('DocumentVerificationFormComponent', () => {
  let component: DocumentVerificationFormComponent;
  let fixture: ComponentFixture<DocumentVerificationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentVerificationFormComponent]
    });
    fixture = TestBed.createComponent(DocumentVerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
