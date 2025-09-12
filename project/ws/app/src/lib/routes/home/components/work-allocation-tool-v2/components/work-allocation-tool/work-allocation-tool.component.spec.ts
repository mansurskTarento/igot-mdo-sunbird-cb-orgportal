import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAllocationToolComponent } from './work-allocation-tool.component';

describe('WorkAllocationToolComponent', () => {
  let component: WorkAllocationToolComponent;
  let fixture: ComponentFixture<WorkAllocationToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkAllocationToolComponent]
    });
    fixture = TestBed.createComponent(WorkAllocationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
