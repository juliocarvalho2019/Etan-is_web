import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelDeleteComponent } from './fuel-delete.component';

describe('FuelDeleteComponent', () => {
  let component: FuelDeleteComponent;
  let fixture: ComponentFixture<FuelDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
