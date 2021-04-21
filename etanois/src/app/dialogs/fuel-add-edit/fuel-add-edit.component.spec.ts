import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelAddEditComponent } from './fuel-add-edit.component';

describe('FuelAddEditComponent', () => {
  let component: FuelAddEditComponent;
  let fixture: ComponentFixture<FuelAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
