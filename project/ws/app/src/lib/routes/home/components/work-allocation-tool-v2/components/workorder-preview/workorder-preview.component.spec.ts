import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderPreviewComponent } from './workorder-preview.component';

describe('WorkorderPreviewComponent', () => {
  let component: WorkorderPreviewComponent;
  let fixture: ComponentFixture<WorkorderPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkorderPreviewComponent]
    });
    fixture = TestBed.createComponent(WorkorderPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
