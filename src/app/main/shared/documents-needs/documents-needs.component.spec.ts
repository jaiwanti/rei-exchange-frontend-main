import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsNeedsComponent } from './documents-needs.component';

describe('DocumentsNeedsComponent', () => {
  let component: DocumentsNeedsComponent;
  let fixture: ComponentFixture<DocumentsNeedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsNeedsComponent]
    });
    fixture = TestBed.createComponent(DocumentsNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
