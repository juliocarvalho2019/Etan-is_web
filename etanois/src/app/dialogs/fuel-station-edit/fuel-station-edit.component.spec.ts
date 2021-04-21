import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelStationEditComponent } from './fuel-station-edit.component';

describe('FuelStationEditComponent', () => {
  let component: FuelStationEditComponent;
  let fixture: ComponentFixture<FuelStationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelStationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelStationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
