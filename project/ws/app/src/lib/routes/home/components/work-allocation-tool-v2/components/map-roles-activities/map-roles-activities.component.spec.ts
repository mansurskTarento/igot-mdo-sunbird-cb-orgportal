import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRolesActivitiesComponent } from './map-roles-activities.component';

describe('MapRolesActivitiesComponent', () => {
  let component: MapRolesActivitiesComponent;
  let fixture: ComponentFixture<MapRolesActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapRolesActivitiesComponent]
    });
    fixture = TestBed.createComponent(MapRolesActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
