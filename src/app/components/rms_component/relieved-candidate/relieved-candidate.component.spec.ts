import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelievedCandidateComponent } from './relieved-candidate.component';

describe('RelievedCandidateComponent', () => {
  let component: RelievedCandidateComponent;
  let fixture: ComponentFixture<RelievedCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelievedCandidateComponent]
    });
    fixture = TestBed.createComponent(RelievedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
