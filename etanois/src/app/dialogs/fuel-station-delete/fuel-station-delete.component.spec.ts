import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelStationDeleteComponent } from './fuel-station-delete.component';

describe('FuelStationDeleteComponent', () => {
  let component: FuelStationDeleteComponent;
  let fixture: ComponentFixture<FuelStationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelStationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelStationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
